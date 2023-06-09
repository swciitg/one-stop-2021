const { body, matchedData } = require("express-validator");
const onestopUserModel = require("../models/userModel");

function titleCase(str) {
  var splitStr = str.toLowerCase().split(' ');
  for (var i = 0; i < splitStr.length; i++) {
      splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
  }
  return splitStr.join(' '); 
}

exports.createOnestopUser = async (name,email,rollNo) => {
  if(onestopUserModel.exists({email})) return await onestopUserModel.find({email}); // already a user exists
  name = titleCase(name);
  onestopuser = onestopUserModel({name,email,rollNo});
  await onestopuser.save();
  return onestopuser;
}


exports.updateOnestopUserValidate = () => {
  return [
    param('userid', 'user id is required').exists(),
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
  let userid = matchedData(req, { locations: ["query"] }).userid;
  let data = matchedData(req, { locations: ["body"] });
  let onestopuser = await onestopUserModel.findById(userid);
  await onestopuser.updateOne(data);
  res.json({ "success": true, "message": "Updated user data correctly" });
}


exports.logoutUserValidate = () => {
  return [
    param('userid', 'user id is required').exists(),
    body('deviceID', 'device ID is required').exists(), // to remove this device id
  ];
}

exports.logoutUser = async (req, res) => {
  console.log(req.body);
  let userid = matchedData(req, { locations: ["query"] }).userid;
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
