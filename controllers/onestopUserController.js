const {body, matchedData, query} = require("express-validator");
const onestopUserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {RefreshTokenError} = require("../errors/jwt.auth.error");
const {
    guestUserName,
    guestUserEmail,
    guestUserRollNo,
    sendToAllFirebaseTopicName,
    defaultNotifCategoriesMap,
    NotificationCategories,
} = require("../helpers/constants");
const {
    RequestValidationError,
} = require("../errors/request.validation.error");
const userNotifTokenModel = require("../models/userNotifTokenModel");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;
const firebase = require("firebase-admin");
const serviceAccount = require("../config/push-notification-key.json");
if (!firebase.apps.length)
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
    });
const asyncHandler = require("../middlewares/async.controllers.handler");
const userPersonalNotifModel = require("../models/userPersonalNotifModel");
const {updateTopicSubscriptionOfUser} = require("./notificationController");

let titleCase = (str) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
};

exports.titleCase = titleCase;

let createOrFindOnestopUserID = async (name, outlookEmail, rollNo) => {
    console.log(name, outlookEmail, rollNo);
    let onestopuser = await onestopUserModel.findOne({outlookEmail});
    console.log(onestopuser);
    if (onestopuser !== null) return onestopuser._id.toString(); // already a user exists
    console.log("here");
    name = titleCase(name);
    onestopuser = onestopUserModel({name, outlookEmail, rollNo});
    console.log(onestopuser);
    console.log("Created new user");
    await onestopuser.save();
    console.log(onestopuser);
    return onestopuser._id.toString();
};

exports.createOrFindOnestopUserID = createOrFindOnestopUserID;

exports.getGuestUserID = async function () {
    console.log(typeof createOrFindOnestopUserID);
    let id = await createOrFindOnestopUserID(
        guestUserName,
        guestUserEmail,
        guestUserRollNo
    ); // get document id for guest
    console.log(id);
    return id;
};

let getUserTokensString = async (userid) => {
    const accessToken = jwt.sign({userid}, accessjwtsecret, {
        expiresIn: "10 days",
    });
    const refreshToken = jwt.sign({userid}, refreshjwtsecret, {
        expiresIn: "150 days",
    });
    return `${accessToken}/${refreshToken}`; // for outlook login
};

exports.getUserTokens = getUserTokensString;

exports.getUserInfo = async (req, res, next) => {
    let onestopuser = await onestopUserModel.findById(req.userid);
    console.log(onestopuser);
    res.json(onestopuser);
};

exports.getUserId = async (req, res, next) => {
    res.json({userId: req.userid});
};

exports.regenerateUserAccessToken = asyncHandler(async (req, res, next) => {
    let refreshToken = req.headers.authorization.split(" ").slice(-1)[0];
    if (!refreshToken)
        next(new RequestValidationError("Refresh token not passed"));
    console.log(refreshToken);
    let decoded;
    jwt.verify(refreshToken, refreshjwtsecret, (err, dec) => {
        if (err) {
            console.log("ERROR OCCURED");
            next(new RefreshTokenError(err.message));
        }
        decoded = dec;
    });
    console.log(decoded);
    if (await onestopUserModel.findById(decoded.userid)) {
        // if someone found JWT refresh secrets and tries to generate access token
        const accessToken = jwt.sign({userid: decoded.userid}, accessjwtsecret, {
            expiresIn: "10 days",
        });
        console.log(accessToken);
        res.json({success: true, accessToken});
    } else next(new RequestValidationError("invalid user id found"));
});

exports.guestUserLogin = asyncHandler(async (req, res) => {
    const guestUserID = await this.getGuestUserID();
    const accessToken = jwt.sign({userid: guestUserID}, accessjwtsecret, {
        expiresIn: "10 days",
    });
    const refreshToken = jwt.sign({userid: guestUserID}, refreshjwtsecret, {
        expiresIn: "150 days",
    });
    res.json({accessToken, refreshToken});
});

exports.updateOnestopUserValidate = [
    query("deviceToken", "device Token").optional(), // every time profile update happens
    body("altEmail", "alt email is required").exists(),
    body("rollNo", "roll no is required").exists(),
    body("dob", "birth date is required").exists(),
    body("gender", "birth date is required")
        .exists()
        .isIn(["Male", "Female", "Others"]),
    body("hostel", "hostel is required").exists(),
    body("roomNo", "roomNo is required").exists(),
    body("homeAddress", "home address is required").exists(),
    body("phoneNumber", "phone number is invalid")
        .exists()
        .isInt({min: 1000000000, max: 9999999999}),
    body("emergencyPhoneNumber", "emergency phone number is invalid")
        .exists()
        .isInt({min: 1000000000, max: 9999999999}),
    body("linkedin", "linkedin is required").optional(),
    body("cycleReg", "Cycle Registration number is required").optional(),
    body("subscribedMess", "subscribed mess is required").exists(),
];
exports.updateOnestopUser = asyncHandler(async (req, res) => {
    let userid = req.userid;
    let data = matchedData(req, {locations: ["body"]});
    console.log(data);
    console.log(userid);
    await onestopUserModel.findByIdAndUpdate(userid, data, {runValidators: true});
    let deviceToken = matchedData(req, {locations: ["query"]}).deviceToken;
    if (deviceToken) {
        let userNotifToken = new userNotifTokenModel({
            userid,
            deviceToken,
            createdAt,
        });
        await userNotifToken.save();
        for (category in NotificationCategories) {
            console.log(category, deviceToken);
            await firebase
                .messaging()
                .subscribeToTopic([deviceToken], category);
        }
    }
    res.json({success: true, message: "Updated user data correctly"});
});

exports.postOnestopUserDeviceTokenValidate = [
    body("deviceToken", "A device token is reqd").exists(),
];

exports.postOnestopUserDeviceToken = asyncHandler(async (req, res) => {
    // creates new device token model or update
    let body = matchedData(req, {locations: ["body"]});
    console.log(body);
    let userNotifTokenPrevious = await userNotifTokenModel.findOne({
        deviceToken: body.deviceToken,
    }); // deviceToken was already there
    console.log("HERE 1");
    console.log(userNotifTokenPrevious);
    if (userNotifTokenPrevious) {
        // attempt for login via different or same account
        console.log("INSIDE IF");
        await userNotifTokenModel.findOneAndUpdate(
            {deviceToken: body.deviceToken},
            {userid: req.userid, createdAt: new Date()}
            , {runValidators: true}
        );
    } else {
        console.log("INSIDE ELSE");
        let userNotifToken = new userNotifTokenModel({
            userid: req.userid,
            deviceToken: body.deviceToken,
        });
        await userNotifToken.save();
    }
    for (category in NotificationCategories) {
        console.log(category, body.deviceToken);
        await firebase
            .messaging()
            .subscribeToTopic([body.deviceToken], category);
    }
    res.json({success: true});
});

exports.updateOnestopUserDeviceTokenValidate = [
    body("oldToken", "old token is reqd").exists(),
    body("newToken", "new token is reqd").exists(),
];

exports.updateOnestopUserDeviceToken = asyncHandler(async (req, res) => {
    // updates token already stored
    let body = matchedData(req, {locations: ["body"]});
    if (body.oldToken !== body.newToken) {
        //token got changed in app
        await userNotifTokenModel.findOneAndUpdate(
            {deviceToken: body.oldToken},
            {deviceToken: body.newToken, createdAt: new Date()}
            , {runValidators: true}
        );
        for (category in NotificationCategories) {
            console.log(category);
            await firebase
                .messaging()
                .unsubscribeFromTopic([body.oldToken], category);
            await firebase
                .messaging()
                .subscribeToTopic([body.newToken], category);
        }
    }
    res.json({success: true});
});

exports.getUserByEmail = async (req, res, next) => {
    const {email} = req.params;
    try {
        const onestopuser = await onestopUserModel.findOne({outlookEmail: email});
        if (onestopuser) {
            return res.status(200).json({found: true, user: onestopuser});
        } else {
            return res.status(204).json({found: false});
        }
    } catch (error) {

        return res.status(500).json({message: "Internal server error"});
    }
};

exports.getUserPersonalNotifs = async (req, res) => {
    let userPersonalNotifs = await userPersonalNotifModel.find({userid: req.userid}).sort({createdAt: -1});
    res.json({userPersonalNotifs});
}

exports.deleteUserPersonalNotifs = async (req, res) => {
    await userPersonalNotifModel.deleteMany({userid: req.userid});
    res.json({success: true});
}

exports.updateOnestopUserNotifPrefsValidate = [
    body(NotificationCategories.lost, "lost pref is required").exists(),
    body(NotificationCategories.found, "found pref is required").exists(),
    body(NotificationCategories.buy, "buy pref is required").exists(),
    body(NotificationCategories.sell, "sell pref is required").exists(),
    body(NotificationCategories.cabSharing, "cab sharing pref is required").exists(),
];

exports.updateOnestopUserNotifPrefs = async (req, res) => {
    let data = matchedData(req, {locations: ["body"]});
    await updateTopicSubscriptionOfUser(data, req.userid);
    console.log("UPDATED SUBSCRIPTION");
    await onestopUserModel.findByIdAndUpdate(req.userid, {notifPref: data}, {runValidators: true});
    console.log("UPDATED Notifpref");
    res.json({success: true});
}

exports.addBlockedFalseAndNotifPrefs = async (req, res) => {
    try {
        const onestopusers = await onestopUserModel.find();
        console.log(onestopusers);
        for (let i = 0; i < onestopusers.length; i++) {
            if (onestopusers[i].hostel !== undefined && onestopusers[i].hostel === "Brahma") {
                onestopusers[i].hostel = "Brahmaputra";
            } else if (onestopusers[i].hostel !== undefined && onestopusers[i].hostel === "Subhansiri") {
                onestopusers[i].hostel = "Subansiri";
            }
            onestopusers[i].blocked = false;
            onestopusers[i].notifPref = defaultNotifCategoriesMap;
            for (const category in NotificationCategories) {
                console.log(category);
                let userNotifTokens = await userNotifTokenModel.find({userid: onestopusers[i]._id});
                for (let j = 0; j < userNotifTokens.length; j++) {
                    console.log(category);
                    await firebase
                        .messaging()
                        .subscribeToTopic(userNotifTokens[j].deviceToken, category);
                }
            }
            await onestopusers[i].save();
        }
        // return res.status(200).json({users: onestopusers});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: "Internal server error"});
    }
}

// exports.logoutUserValidate = [
//   body('deviceToken', 'device Token is required').exists(), // to remove this device id
// ];

// exports.logoutUser = async (req, res) => {
//   console.log(req.body);
//   let deviceToken = req.body.deviceToken;
//   await userNotifTokenModel.deleteMany({deviceToken});
//   res.json({ "success": true, "message": "logged out user successfully" });
// }
