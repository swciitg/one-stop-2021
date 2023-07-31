const express = require("express");
const { sendToDevice, sendToAll, sendToAllValidate, sendToDeviceValidate, sendTestNotifToDevice } = require("../controllers/notificationController");
const { requestValidation } = require("../middlewares/validate.request");
const { verifyUserRequest, restrictIfGuest } = require("../middlewares/user.auth");
const notificationRouter = express.Router();

notificationRouter.post("/notification/send/test",sendTestNotifToDevice);

notificationRouter.post("/notification/send",sendToDeviceValidate,requestValidation, sendToDevice);
notificationRouter.post("/notification/send/all",sendToAllValidate,requestValidation, sendToAll);

module.exports = notificationRouter;
