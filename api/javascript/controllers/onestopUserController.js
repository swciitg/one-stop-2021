const { body, matchedData, query } = require("express-validator");
const onestopUserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { RefreshTokenError } = require("../errors/jwt.auth.error");
const { guestUserName, guestUserEmail, guestUserRollNo, sendToAllFirebaseTopicName } = require("../helpers/constants");
const { RequestValidationError } = require("../errors/request.validation.error");
const userNotifTokenModel = require("../models/userNotifTokenModel");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;
const firebase = require("firebase-admin");
const serviceAccount = require("../config/push-notification-key.json");

let titleCase = (str)=>{
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' ');
}

exports.titleCase = titleCase;

let createOrFindOnestopUserID = async (name,outlookEmail,rollNo) => {
  console.log(name,outlookEmail,rollNo);
  let onestopuser = await onestopUserModel.findOne({outlookEmail});
  console.log(onestopuser);
  if(onestopuser!==null) return onestopuser._id.toString(); // already a user exists
  console.log("here");
  name = titleCase(name);
  onestopuser = onestopUserModel({name,outlookEmail,rollNo});
  console.log(onestopuser);
  console.log("Created new user");
  await onestopuser.save();
  console.log(onestopuser);
  return onestopuser._id.toString();
}

exports.createOrFindOnestopUserID = createOrFindOnestopUserID;

exports.getGuestUserID = async function(){
  console.log(typeof(createOrFindOnestopUserID));
  let id = await createOrFindOnestopUserID(guestUserName,guestUserEmail,guestUserRollNo); // get document id for guest
  console.log(id);
  return id;
}


let getUserTokensString = async (userid) => {
  const accessToken = jwt.sign({ userid }, accessjwtsecret, {
    expiresIn: 30,
  });
  const refreshToken = jwt.sign({ userid }, refreshjwtsecret, {
    expiresIn: 600,
  });
  return `${accessToken}/${refreshToken}`; // for outlook login
}

exports.getUserTokens = getUserTokensString;

exports.getUserInfo = async (req,res,next) => {
  let onestopuser = await onestopUserModel.findById(req.userid);
  console.log(onestopuser);
  res.json(onestopuser);
}

exports.regenerateUserAccessToken = async (req, res,next) => {
  let refreshToken = req.headers.authorization.split(" ").slice(-1)[0];
  if(!refreshToken) next(new RequestValidationError("Refresh token not passed"));
  let decoded;
  jwt.verify(refreshToken, refreshjwtsecret, (err,dec) => {
    if(err){
      next(new RefreshTokenError(err.message));
    }
    decoded=dec;
  });
  if (await onestopUserModel.findById(decoded.userid) !== undefined) { // if someone found JWT refresh secrets and tries to generate access token
    const accessToken = jwt.sign({ userid: decoded.userid }, accessjwtsecret, {
      expiresIn: 30
    });
    res.json({ success: true, accessToken });
  }
  else next(new RequestValidationError("invalid user id found"));
}

exports.guestUserLogin = async (req,res) => {
  const guestUserID = await this.getGuestUserID();
  const accessToken = jwt.sign({ userid: guestUserID }, accessjwtsecret, {
    expiresIn: 30,
  });
  const refreshToken = jwt.sign({ guestUserID }, refreshjwtsecret, {
    expiresIn: 600,
  });
  res.json({accessToken,refreshToken});
}

exports.updateOnestopUserValidate = [
  query('deviceToken', 'device Token').optional(), // every time profile update happens
  body('altEmail', 'alt email is required').exists(),
  body('rollNo', 'roll no is required').exists(),
  body('dob', 'birth date is required').exists(),
  body('gender', 'birth date is required').exists().isIn(["Male", "Female", "Others"]),
  body('hostel', 'hostel is required').exists(),
  body('roomNo', 'roomNo is required').exists(),
  body('homeAddress', 'home address is required').exists(),
  body('phoneNumber', 'phone number is required').exists().isInt({ min: 1000000000, max: 9999999999 }),
  body('emergencyPhoneNumber', 'phone number is required').exists().isInt({ min: 1000000000, max: 9999999999 }),
  body('linkedin', 'user linkedin profile').optional()
];

exports.updateOnestopUser = async (req, res) => {
  let userid = req.userid;
  let data = matchedData(req, { locations: ["body"] });
  console.log(data);
  console.log(userid);
  await onestopUserModel.findByIdAndUpdate(userid,data);
  let deviceToken = matchedData(req, { locations: ["query"] }).deviceToken;
  if(deviceToken){
    let userNotifToken = new userNotifTokenModel({userid, deviceToken,createdAt});
    await userNotifToken.save();
  }
  res.json({ "success": true, "message": "Updated user data correctly" });
}

exports.postOnestopUserDeviceTokenValidate = [
  body("deviceToken","A device token is reqd").exists()
];

exports.postOnestopUserDeviceToken = async (req,res) => { // creates new device token model or update
  let body = matchedData(req,{locations: ["body"]});
  let userNotifTokenPrevious = await userNotifTokenModel.find({deviceToken: body.deviceToken}); // deviceToken was already there
  if(userNotifTokenPrevious){
    // attempt for login via different or same account
    await userNotifTokenModel.findOneAndUpdate({deviceToken: body.deviceToken},{userid: req.userid,createdAt: new Date});
  }
  else{
    let userNotifToken = new userNotifTokenModel({userid: req.userid,deviceToken: body.deviceToken});
    await userNotifToken.save();
  }
  if (!firebase.apps.length)
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
    });
  await firebase.messaging().subscribeToTopic([body.deviceToken],sendToAllFirebaseTopicName);
  res.json({"success" : true});
}

exports.updateOnestopUserDeviceTokenValidate = [
  body("oldToken","old token is reqd").exists(),
  body("newToken","new token is reqd").exists()
];

exports.updateOnestopUserDeviceToken = async (req,res) => { // updates token already stored
  let body = matchedData(req,{locations: ["body"]});
  if(body.oldToken!==body.newToken){
    //token got changed in app
    await userNotifTokenModel.findOneAndUpdate({deviceToken: body.oldToken},{deviceToken: body.newToken,createdAt: new Date});
    await firebase.messaging().unsubscribeFromTopic([body.oldToken],sendToAllFirebaseTopicName);
    await firebase.messaging().subscribeToTopic([body.newToken],sendToAllFirebaseTopicName);
  }
  res.json({"success" : true});
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
