const express = require("express");
const { sendToDevice } = require("../controllers/notificationController");
const notificationRouter = express.Router();

notificationRouter.post("/notification/send", sendToDevice);

module.exports = notificationRouter;
