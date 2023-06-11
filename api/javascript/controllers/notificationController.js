const firebase = require("firebase-admin");
const serviceAccount = require("../config/push-notification-key.json");
const userModel = require("../models/userModel");
const { body, matchedData } = require("express-validator");
const userNotifTokenModel = require("../models/userNotifTokenModel");

exports.sendToDeviceValidate = [
  body("category", "notif must have a category").exists(),
  body("model", "notif must have a model").exists(),
  body("header", "a header is required to send notification").exists(),
  body("body", "a body is required to send notification").exists(),
];

exports.sendToDevice = async (req, res) => {
  if (!firebase.apps.length)
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
    });

    if (!req.body.sendTo) {
      throw "Missing Fields";
    }

    let user = await userModel.findOne({ outlookEmail: req.body.sendTo });
    
    const token = user["deviceIDs"][0];
    // this only allows one device at a time so either loop through or send to only one device per user which is better

    const payload = {
      data: {
        category: req.body.notif.category,
        model: req.body.notif.model,
        header: req.body.notif.header,
        body: req.body.notif.body
      }
    };

    const options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };


    let userNotifTokens = await userNotifTokenModel.find({userid: user._id});
    userNotifTokens.forEach((userNotifToken) => firebase.messaging().sendToDevice(userNotifToken.deviceToken, payload, options));
    res.json({success: true,message: "notif sent"});
};

exports.sendToAllValidate = [
  body("category", "notif must have a category").exists(),
  body("header", "a header is required to send notification").exists(),
  body("body", "a body is required to send notification").exists(),
];

exports.sendToAll = async (req, res, next) => {
  if (!firebase.apps.length)
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount)
    }); // on server initialization

  let compDate = new Date();
  compDate.setMonth(compDate.getMonth()-3); // set date 3 months prior
  let inactiveNotifTokens = await userNotifTokenModel.find({createdAt: {
    $lte: compDate
  }});

  let inactiveDeviceTokens = inactiveNotifTokens.map((userNotif) => userNotif.deviceToken);

  await userNotifTokenModel.deleteMany({createdAt: {
    $lte: compDate
  }});

  await firebase.messaging().unsubscribeFromTopic(inactiveDeviceTokens,"all");

  let bodyData = matchedData(req,{locations: ["body"]});
  const payload = {
    data: {
      category: bodyData.category,
      model: bodyData.model,
      header: bodyData.header,
      body: bodyData.body
    },
    topic: "all",
  };

  let data = await firebase.messaging().send(payload);

  res.json({
    success: true,
    message: data,
  });
};
