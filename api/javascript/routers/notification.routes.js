const express = require("express");
const { sendToDevice, sendToAll } = require("../controllers/notificationController");
const notificationRouter = express.Router();

notificationRouter.post("/notification/send", sendToDevice);
notificationRouter.post("/notification/send/all", sendToAll);

module.exports = notificationRouter;
