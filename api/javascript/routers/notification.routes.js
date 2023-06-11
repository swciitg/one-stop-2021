const express = require("express");
const { sendToDevice, sendToAll, sendToAllValidate, sendToDeviceValidate } = require("../controllers/notificationController");
const { requestValidation } = require("../middlewares/validate.request");
const { verifyUserRequest, restrictIfGuest } = require("../middlewares/user.auth");
const notificationRouter = express.Router();

notificationRouter.post("/notification/send",verifyUserRequest,restrictIfGuest,sendToDeviceValidate,requestValidation, sendToDevice);
notificationRouter.post("/notification/send/all",verifyUserRequest,restrictIfGuest,sendToAllValidate,requestValidation, sendToAll);

module.exports = notificationRouter;
