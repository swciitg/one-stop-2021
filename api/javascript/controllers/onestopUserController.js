const { body, matchedData } = require("express-validator");
const onestopUserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { RefreshTokenError } = require("../errors/jwt.auth.error");
const { guestUserName, guestUserEmail, guestUserRollNo } = require("../helpers/constants");
const { RequestValidationError } = require("../errors/request.validation.error");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;

let titleCase = (str)=>{
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' ');
}

exports.titleCase = titleCase;

let createOrFindOnestopUserID = async (name,outlook_email,rollNo) => {
  console.log(name,outlook_email,rollNo);
  let onestopuser = await onestopUserModel.findOne({outlook_email});
  console.log(onestopuser);
  if(onestopuser!==null) return onestopuser._id.toString(); // already a user exists
  console.log("here");
  name = titleCase(name);
  onestopuser = onestopUserModel({name,outlook_email,rollNo});
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


let getUserTokensAndInfo = async (userid) => {
  let onestopuser = onestopUserModel.findById(userid);
  const accessToken = jwt.sign({ userid }, accessjwtsecret, {
    expiresIn: "1 days",
  });
  const refreshToken = jwt.sign({ userid }, refreshjwtsecret, {
    expiresIn: "60 days",
  });
  return { accessToken, refreshToken, name: onestopuser.name, email: onestopuser.email, rollNo: onestopuser.rollNo};
}

exports.getUserTokensAndInfo = getUserTokensAndInfo;

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
      expiresIn: "1 days"
    });
    res.json({ success: true, accessToken });
  }
  else next(new RequestValidationError("invalid user id found"));
}

exports.guestUserLogin = async (req,res) => {
  const guestUserID = await this.getGuestUserID();
  let userJson = await this.getUserTokensAndInfo(guestUserID);
  res.json(userJson);
}

exports.updateOnestopUserValidate = () => {
  return [
    body('deviceID', 'device ID is required').exists(), // every time profile update happens
    body('altEmail', 'alt email is required').exists(),
    body('rollNo', 'roll no is required').exists(),
    body('dob', 'birth date is required').exists(),
    body('gender', 'birth date is required').exists().isIn(["Male", "Female", "Others"]),
    body('hostel', 'hostel is required').exists(),
    body('roomNo', 'roomNo is required').exists(),
    body('homeAddress', 'home address is required').exists(),
    body('phoneNumber', 'phone number is required').exists().isInt({ min: 1000000000, max: 9999999999 }),
    body('emergencyPhoneNumber', 'phone number is required').exists().isInt({ min: 1000000000, max: 9999999999 }),
  ];
}

exports.updateOnestopUser = async (req, res) => {
  let userid = req.userid;
  let data = matchedData(req, { locations: ["body"] });
  let onestopuser = await onestopUserModel.findById(userid);
  await onestopuser.updateOne(data);
  res.json({ "success": true, "message": "Updated user data correctly" });
}


exports.logoutUserValidate = () => {
  return [
    body('deviceID', 'device ID is required').exists(), // to remove this device id
  ];
}

exports.logoutUser = async (req, res) => {
  console.log(req.body);
  let userid = req.userid;
  let deviceID = matchedData(req, { locations: ["body"] }).deviceID;
  let onestopuser = await onestopUserModel.findById(userid);
  console.log(onestopuser);
  if(!onestopuser.deviceTokens.includes(deviceID)){
    next(new RequestValidationError("Device ID not found"));
  }
  var deviceIdIdx = onestopuser.deviceIDs.indexOf(deviceID);
  onestopuser.deviceIDs.splice(deviceIdIdx, 1);
  await onestopuser.save();
  res.json({ "success": true, "message": "logged out user successfully" });
}
