const firebase = require("firebase-admin");
const serviceAccount = require("../config/push-notification-key.json");
const { userModel } = require("../models/onestopUserModel");

exports.sendToDevice = async (req, res) => {
  if (!firebase.apps.length)
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
    });

  try {
    if (!req.body.sendTo) {
      throw "Missing Fields";
    }

    let user = await userModel.findOne({ email: req.body.sendTo });

    if (!user) {
      throw "Device for the given user not found!";
    }
    const token = user["deviceToken"];

    const payload = {
      data: {
        category: req.body.notif.category,
        model: req.body.notif.model,
        header: req.body.notif.header,
        body: req.body.notif.body,
      },
    };

    const options = {
      priority: "high",
      timeToLive: 60 * 60 * 24,
    };

    let data = await firebase.messaging().sendToDevice(token, payload, options);
    console.log(data);
    res.send({
      success: true,
      message: data,
    });
  } catch (e) {
    console.log(e)
    res.send({
      success: false,
      message: e
    });
  }
};

exports.sendToAll = async (req, res, next) => {};
