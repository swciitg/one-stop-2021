const { body, matchedData } = require("express-validator");
const onestopUserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const { RefreshTokenError } = require("../errors/jwt.auth.error");
const { guestUserName, guestUserEmail, guestUserRollNo } = require("../helpers/constants");
const { RequestValidationError } = require("../errors/request.validation.error");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;

exports.titleCase = (str)=>{
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

exports.getGuestUserID = async function(){
  return await this.createOrFindOnestopUserID(guestUserName,guestUserEmail,guestUserRollNo); // get document id for guest
}


exports.generateUserTokens = async function generateUserTokens(userid) {
  const accessToken = jwt.sign({ userid }, accessjwtsecret, {
    expiresIn: "1 days",
  });
  const refreshToken = jwt.sign({ userid }, refreshjwtsecret, {
    expiresIn: "60 days",
  });
  return { accessToken, refreshToken };
}

exports.regenerateUserAccessToken = async (req, res) => {
  let refreshToken = req.headers.authorization.split(" ").slice(-1)[0];
  if(!refreshToken) throw new RequestValidationError("Refresh token not passed");
  let decoded;
  jwt.verify(refreshToken, refreshjwtsecret, (err,dec) => {
    if(err){
      throw new RefreshTokenError(err.message);
    }
    decoded=dec;
  });
  if (await onestopUserModel.findById(decoded.userid) !== undefined) { // if someone found JWT refresh secrets and tries to generate access token
    const accessToken = jwt.sign({ userid: decoded.userid }, accessjwtsecret, {
      expiresIn: "1 days"
    });
    res.json({ success: true, accessToken });
  }
  else throw new RequestValidationError("invalid user id found");
}

exports.guestUserLogin = async (req,res) => {
  const guestUserID = await this.getGuestUserID();
  let userJson = await this.generateUserTokens(guestUserID);
  userJson.name = guestUserName;
  userJson.email = guestUserEmail;
  res.json(userJson);
}


exports.createOrFindOnestopUserID = async (name,outlook_email,rollNo) => {
  console.log(name,outlook_email,rollNo);
  let onestopuser = await onestopUserModel.findOne({outlook_email});
  console.log(onestopuser);
  if(onestopuser!==null) return onestopuser._id.toString(); // already a user exists
  console.log("here");
  name = this.titleCase(name);
  onestopuser = onestopUserModel({name,outlook_email,rollNo});
  console.log(onestopuser);
  console.log("Created new user");
  await onestopuser.save();
  console.log(onestopuser);
  return onestopuser._id.toString();
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
    throw new RequestValidationError("Device ID not found");
  }
  var deviceIdIdx = onestopuser.deviceIDs.indexOf(deviceID);
  onestopuser.deviceIDs.splice(deviceIdIdx, 1);
  await onestopuser.save();
  res.json({ "success": true, "message": "logged out user successfully" });
}
