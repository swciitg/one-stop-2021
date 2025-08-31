import { body, matchedData, query } from "express-validator";
import onestopUserModel from "../models/userModel.js";
import redis from "../utils/redisClient.js";
import jwt from "jsonwebtoken";
import { RefreshTokenError } from "../errors/jwt.auth.error.js";
import crypto from "crypto";
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

import {
    guestUserName,
    guestUserEmail,
    guestUserRollNo,
    sendToAllFirebaseTopicName,
    defaultNotifCategoriesMap,
    NotificationCategories,
} from "../helpers/constants.js";
import {
    RequestValidationError,
} from "../errors/request.validation.error.js";
import userNotifTokenModel from "../models/userNotifTokenModel.js";
import firebase from "firebase-admin";
import serviceAccount from "../config/push-notification-key.json" with { type: "json" };
import asyncHandler from "../middlewares/async.controllers.handler.js";
import userPersonalNotifModel from "../models/userPersonalNotifModel.js";
import { updateTopicSubscriptionOfUser } from "./notificationController.js";

const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;

if (!firebase.apps.length)
    firebase.initializeApp({
        credential: firebase.credential.cert(serviceAccount),
    });

let titleCase = (str) => {
    var splitStr = str.toLowerCase().split(" ");
    for (var i = 0; i < splitStr.length; i++) {
        splitStr[i] =
            splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
    }
    return splitStr.join(" ");
};

export const createOrFindOnestopUserID = async (name, outlookEmail, rollNo) => {
    let onestopuser = await onestopUserModel.findOne({outlookEmail});
    if (onestopuser !== null) return onestopuser._id.toString(); // already a user exists
    name = titleCase(name);
    onestopuser = onestopUserModel({name, outlookEmail, rollNo});
    await onestopuser.save();
    return onestopuser._id.toString();
};

export const getGuestUserID = async function () {
    let id = await createOrFindOnestopUserID(
        guestUserName,
        guestUserEmail,
        guestUserRollNo
    ); // get document id for guest
    return id;
};

export const getUserTokens = async (userid) => {
    const accessToken = jwt.sign({userid}, accessjwtsecret, {
        expiresIn: "10 days",
    });
    const refreshToken = jwt.sign({userid}, refreshjwtsecret, {
        expiresIn: "150 days",
    });
    return `${accessToken}/${refreshToken}`; // for outlook login
};

export const getUserInfo = async (req, res, next) => {
    const key = `user:full:${req.userid}`;
    const cached = await redis.get(key);
        if (cached) {
            console.log("User found in cache");
            return res.json(JSON.parse(cached));
    }
    let onestopuser = await onestopUserModel.findById(req.userid);
        if (!onestopuser) {
            return res.status(404).send("User not found");
        }
        await redis.set(key, JSON.stringify(onestopuser), "EX", 864000);

    res.json(onestopuser);
};

export const getUserId = async (req, res, next) => {
    res.json({userId: req.userid});
};

export const regenerateUserAccessToken = asyncHandler(async (req, res, next) => {
    let refreshToken = req.headers.authorization.split(" ").slice(-1)[0];
    if (!refreshToken)
        next(new RequestValidationError("Refresh token not passed"));
    let decoded;
    jwt.verify(refreshToken, refreshjwtsecret, (err, dec) => {
        if (err) {
            next(new RefreshTokenError(err.message));
        }
        decoded = dec;
    });
    if (await onestopUserModel.findById(decoded.userid)) {
        // if someone found JWT refresh secrets and tries to generate access token
        const accessToken = jwt.sign({userid: decoded.userid}, accessjwtsecret, {
            expiresIn: "10 days",
        });
        res.json({success: true, accessToken});
    } else next(new RequestValidationError("invalid user id found"));
});

export const guestUserLogin = asyncHandler(async (req, res) => {
    const guestUserID = await getGuestUserID();
    const accessToken = jwt.sign({userid: guestUserID}, accessjwtsecret, {
        expiresIn: "10 days",
    });
    const refreshToken = jwt.sign({userid: guestUserID}, refreshjwtsecret, {
        expiresIn: "150 days",
    });
    res.json({accessToken, refreshToken});
});

export const updateOnestopUserValidate = [
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
export const updateOnestopUser = asyncHandler(async (req, res) => {
    let userid = req.userid;
    let data = matchedData(req, {locations: ["body"]});
    await onestopUserModel.findByIdAndUpdate(userid, data, {runValidators: true});
    const key1 = `user:full:${userid}`;
    const key2 = `user:block:${userid}`;
    await redis.del(key1);
    await redis.del(key2);
    let deviceToken = matchedData(req, {locations: ["query"]}).deviceToken;
    if (deviceToken) {
        let userNotifToken = new userNotifTokenModel({
            userid,
            deviceToken,
            createdAt,
        });
        await userNotifToken.save();
        for (category in NotificationCategories) {
            await firebase
                .messaging()
                .subscribeToTopic([deviceToken], category);
        }
    }
    res.json({success: true, message: "Updated user data correctly"});
});

export const postOnestopUserDeviceTokenValidate = [
    body("deviceToken", "A device token is reqd").exists(),
];

export const postOnestopUserDeviceToken = asyncHandler(async (req, res) => {
    // creates new device token model or update
    let body = matchedData(req, {locations: ["body"]});
    let userNotifTokenPrevious = await userNotifTokenModel.findOne({
        deviceToken: body.deviceToken,
    }); // deviceToken was already there
    if (userNotifTokenPrevious) {
        // attempt for login via different or same account
        await userNotifTokenModel.findOneAndUpdate(
            {deviceToken: body.deviceToken},
            {userid: req.userid, createdAt: new Date()}
            , {runValidators: true}
        );
    } else {
        let userNotifToken = new userNotifTokenModel({
            userid: req.userid,
            deviceToken: body.deviceToken,
        });
        await userNotifToken.save();
    }
    for (category in NotificationCategories) {
        await firebase
            .messaging()
            .subscribeToTopic([body.deviceToken], category);
    }
    res.json({success: true});
});

export const updateOnestopUserDeviceTokenValidate = [
    body("oldToken", "old token is reqd").exists(),
    body("newToken", "new token is reqd").exists(),
];

export const updateOnestopUserDeviceToken = asyncHandler(async (req, res) => {
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

export const getUserByEmail = async (req, res, next) => {
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

export const getUserPersonalNotifs = async (req, res) => {
    let userPersonalNotifs = await userPersonalNotifModel.find({userid: req.userid}).sort({createdAt: -1});
    res.json({userPersonalNotifs});
}

export const deleteUserPersonalNotifs = async (req, res) => {
    await userPersonalNotifModel.deleteMany({userid: req.userid});
    res.json({success: true});
}

export const updateOnestopUserNotifPrefsValidate = [
    body(NotificationCategories.lost, "lost pref is required").exists(),
    body(NotificationCategories.found, "found pref is required").exists(),
    body(NotificationCategories.buy, "buy pref is required").exists(),
    body(NotificationCategories.sell, "sell pref is required").exists(),
    body(NotificationCategories.cabSharing, "cab sharing pref is required").exists(),
];

export const updateOnestopUserNotifPrefs = async (req, res) => {
    let data = matchedData(req, {locations: ["body"]});
    await updateTopicSubscriptionOfUser(data, req.userid);
    await onestopUserModel.findByIdAndUpdate(req.userid, {notifPref: data}, {runValidators: true});
    res.json({success: true});
}

export const addBlockedFalseAndNotifPrefs = async (req, res) => {
    try {
        const onestopusers = await onestopUserModel.find();
        for (let i = 0; i < onestopusers.length; i++) {
            if (onestopusers[i].hostel !== undefined && onestopusers[i].hostel === "Brahma") {
                onestopusers[i].hostel = "Brahmaputra";
            } else if (onestopusers[i].hostel !== undefined && onestopusers[i].hostel === "Subhansiri") {
                onestopusers[i].hostel = "Subansiri";
            }
            onestopusers[i].blocked = false;
            onestopusers[i].notifPref = defaultNotifCategoriesMap;
            for (const category in NotificationCategories) {
                let userNotifTokens = await userNotifTokenModel.find({userid: onestopusers[i]._id});
                for (let j = 0; j < userNotifTokens.length; j++) {
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


const GATELOG_SECRET_KEY = process.env.GATELOG_SECRET_KEY;
if (!GATELOG_SECRET_KEY) {
  console.log("No gatelog secret key setup")
}

// HMAC-SHA256(rollNo, GATELOG_SECRET_KEY) -> hex
function hmacRollNo(rollNo) {
  return crypto
    .createHmac("sha256", GATELOG_SECRET_KEY)
    .update(String(rollNo), "utf8")
    .digest("hex");
}

// constant-time comparison for hex strings
function constantTimeEqual(a, b) {
  const ba = Buffer.from(a, "hex");
  const bb = Buffer.from(b, "hex");
  if (ba.length !== bb.length) return false;
  return crypto.timingSafeEqual(ba, bb);
}

// AES-256-GCM encrypt JSON string; returns "ivB64.tagB64.ctB64"
function encryptWithAesGcm(plaintext) {
  const key = crypto.createHash("sha256").update(GATELOG_SECRET_KEY, "utf8").digest(); // 32B
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return `${iv.toString("base64")}.${tag.toString("base64")}.${ciphertext.toString("base64")}`;
}

// validators
export const getUserByRollSecureValidate = [
  query("rollNo", "rollNo is required").exists().bail().isString().trim().notEmpty(),
  query("token", "token is required").exists().bail().isString().trim().notEmpty(),
];

// controller
export const getUserByRollSecure = asyncHandler(async (req, res) => {
  const { rollNo, token } = matchedData(req, { locations: ["query"] });
  console.log(`Secure GET user by rollNo: ${rollNo}, token: ${token}`);

  // 1) Auth check
  const expected = hmacRollNo(rollNo);
  if (!constantTimeEqual(expected, token)) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }

  // 2) Find user
  const user = await onestopUserModel.findOne({ rollNo }).lean();
  if (!user) {
    return res.status(404).json({ success: false, message: "User not found" });
  }

  // 3) Prepare safe payload (omit __v, etc.)
  const { __v, ...safeUser } = user;

  // 4) Encrypt and send
  const encrypted = encryptWithAesGcm(JSON.stringify(safeUser));
  return res.status(200).json({ success: true, data: encrypted });
});


// exports.logoutUserValidate = [
//   body('deviceToken', 'device Token is required').exists(), // to remove this device id
// ];

// exports.logoutUser = async (req, res) => {
//   console.log(req.body);
//   let deviceToken = req.body.deviceToken;
//   await userNotifTokenModel.deleteMany({deviceToken});
//   res.json({ "success": true, "message": "logged out user successfully" });
// }
