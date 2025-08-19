import firebase from "firebase-admin";
import serviceAccount from "../config/push-notification-key.json" assert { type: "json" };
import { body, matchedData } from "express-validator";
import userNotifTokenModel from "../models/userNotifTokenModel.js";
import { sendToAllFirebaseTopicName } from "../helpers/constants.js";
import { RequestValidationError } from "../errors/request.validation.error.js";
import userPersonalNotifModel from "../models/userPersonalNotifModel.js";
import topicNotifModel from "../models/topicNotifModel.js";

if (!firebase.apps.length)
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });

export const sendTestNotifToDevice = async (req, res) => {
  // console.log(req.body);

  // if (!req.body.sendTo) {
  //   throw new RequestValidationError("Missing Fields");
  // }

  // let user = await userModel.findOne({ outlookEmail: req.body.sendTo });
  // let userNotifTokens = await userNotifTokenModel.find({ userid: user._id });
  // console.log(userNotifTokens);
  // for (let i = 0; i < userNotifTokens.length; i++) {
  //   console.log(userNotifTokens[i])
  //   const message = {
  //       "notification": {
  //           "title": "Test Notification",
  //           "body": "This is a test notification",
  //       },
  //       "token": userNotifTokens[i].deviceToken,
  //   };

  //   try {
  //       await firebase.messaging().send(message);
  //       res.status(200).json({ message: "Notification sent successfully" });
  //   } catch (error) {
  //       console.log("Error sending notification", error);
  //       res.status(500).json({ message: "Internal Server Error" });
  //   }
  // }
};

export const sendNotifByEmail = async (req, res) => {
  // let outlookEmail=req.body.outlookEmail;
  // let onestopUser=await userModel.findOne({outlookEmail: outlookEmail});

  // if(!onestopUser){
  //   res.json({success: false});
  //   return;
  // }

  // if(onestopUser) await this.sendToUser(onestopUser._id,req.body.category,req.body.title,req.body.body);
  // console.log("SENT TO EMAIL NOTIFS");
  // res.json({success: true});
};

export const sendNotifByEmailList = async (req, res) => {
  // console.log(req.body);
  // console.log(req.headers);
  // let outlookEmails=req.body.outlookEmails;
  // for(let i=0;i<outlookEmails.length;i++){
  //   let outlookEmail = req.body.outlookEmails[i];
  //   let onestopUser = await userModel.findOne({outlookEmail: outlookEmail});

  //   if(!onestopUser){
  //     continue;
  //   }

  //   if(onestopUser) await this.sendToUser(onestopUser._id,req.body.category,req.body.title,req.body.body);
  // }
  // res.json({success: true});
};

export const updateTopicSubscriptionOfUser = async (notifPref, userid) => {
  let userNotifTokens = await userNotifTokenModel.find({ userid: userid });
  for (let i = 0; i < userNotifTokens.length; i++) {
    for (let category in notifPref) {
      await firebase.messaging().unsubscribeFromTopic([userNotifTokens[i].deviceToken], category);
      if (notifPref[category] === true) {
        await firebase.messaging().subscribeToTopic([userNotifTokens[i].deviceToken], category);
      }
    }
  }
};

export const sendToUser = async (userid, category, title, body) => {
  // const options = { priority: "high" };

  // let userNotifTokens = await userNotifTokenModel.find({ userid: userid });
  // console.log(userNotifTokens);

  // let userPersonalNotif = userPersonalNotifModel({userid,category,title,body});
  // await userPersonalNotif.save();

  // for (let i = 0; i < userNotifTokens.length; i++) {
  //     let message = {
  //       "notification": {
  //           "title": title,
  //           "body": body,
  //       },
  //       "data": {
  //           "category": category,
  //           "title": title,
  //           "body": body
  //       },
  //       "token": userNotifTokens[i].deviceToken,
  //   };

  //  try {
  //       await firebase.messaging().send(message);
  //       console.log("Successfully sent message");
  //     } catch (error) {
  //       console.error("Error sending message:", error);

  //       if (error.code === "messaging/registration-token-not-registered") {
  //         console.log(`Invalid token found: ${userNotifTokens[i].deviceToken}`);
  //         await userNotifTokenModel.deleteOne({ _id: userNotifTokens[i]._id });
  //       }
  //     }
  // }
};

export const sendToATopic = async (topic, notification, data) => {
  // const message = {
  //     "notification": notification,
  //     "data": data,
  //     "topic": topic,
  // };

  // let topicNotif = topicNotifModel(data);
  // await topicNotif.save();

  // try {
  //     await firebase.messaging().send(message);
  //     console.log("Notification sent successfully");
  // } catch (error) {
  //     console.log("Error sending notification", error);
  // }

  // console.log(`SENT TO TOPIC: ${topic}`);
};

export const getAllTopicNotifs = async (req, res) => {
  let topicNotifs = await topicNotifModel.find().sort({ createdAt: -1 });
  res.json({ "allTopicNotifs": topicNotifs });
};

export const sendToAllValidate = [
  body("category", "notif must have a category").exists(),
  body("model", "notif must have a model string").exists(),
  body("header", "a header is required to send notification").exists(),
  body("body", "a body is required to send notification").exists(),
];

export const sendToAll = async (req, res) => {
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
  await firebase.messaging().sendToTopic(sendToAllFirebaseTopicName, payload);
};
