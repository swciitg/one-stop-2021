const firebase = require("firebase-admin");
const serviceAccount = require("../config/push-notification-key.json");
if (!firebase.apps.length)
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
const userModel = require("../models/userModel");
const { body, matchedData } = require("express-validator");
const userNotifTokenModel = require("../models/userNotifTokenModel");
const { sendToAllFirebaseTopicName } = require("../helpers/constants");
const { RequestValidationError } = require("../errors/request.validation.error");

exports.sendToDeviceValidate = [
  body("category", "notif must have a category").exists(),
  body("model", "notif must have a model").exists(),
  body("header", "a header is required to send notification").exists(),
  body("body", "a body is required to send notification").exists(),
  body("sendTo", "Send to email is required").exists()
];

exports.sendToDevice = async (req, res) => {

  if (!req.body.sendTo) {
    throw new RequestValidationError("Missing Fields");
  }

  let user = await userModel.findOne({ outlookEmail: req.body.sendTo });

  const payload = {
    "notification": {
      "body": req.body.body,
      "OrganizationId": "2",
      "priority": "high",
      "subtitle": req.body.header,
      "Title": "hello"
    },
    data: {
      category: req.body.category,
      model: req.body.model,
      header: req.body.header,
      body: req.body.body
    }
  };

  const options = { priority: "high" };
  let userNotifTokens = await userNotifTokenModel.find({ userid: user._id });
  console.log(userNotifTokens);
  for (let i = 0; i < userNotifTokens.length; i++) {
    await firebase.messaging().sendToDevice(userNotifTokens[i].deviceToken, payload);
    console.log("NOTIFICATION SENT");
  }
};

exports.sendToAllValidate = [
  body("category", "notif must have a category").exists(),
  body("model", "notif must have a model string").exists(),
  body("header", "a header is required to send notification").exists(),
  body("body", "a body is required to send notification").exists(),
];

exports.sendToAll = async (req, res) => {

  let compDate = new Date();
  compDate.setMonth(compDate.getMonth() - 3); // set date 3 months prior
  let inactiveNotifTokens = await userNotifTokenModel.find({
    createdAt: {
      $lte: compDate
    }
  });

  let inactiveDeviceTokens = inactiveNotifTokens.map((userNotif) => userNotif.deviceToken);

  await userNotifTokenModel.deleteMany({
    createdAt: {
      $lte: compDate
    }
  });

  if (inactiveDeviceTokens.length > 0) await firebase.messaging().unsubscribeFromTopic(inactiveDeviceTokens, sendToAllFirebaseTopicName);

  let bodyData = matchedData(req);
  console.log(bodyData);
  console.log(req.body);
  const payload = {
    "notification": {
      "body": req.body.body,
      "OrganizationId": "2",
      "priority": "high",
      "subtitle": req.body.header,
      "Title": "hello"
    },
    data: {
      category: req.body.category,
      model: req.body.model,
      header: req.body.header,
      body: req.body.body
    }
  };

  console.log(payload);
  const options = { priority: "high" };
  await firebase.messaging().sendToTopic(sendToAllFirebaseTopicName, payload);
};
