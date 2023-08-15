const express = require("express");
const { sendToDeviceValidate, getAllTopicNotifs, sendNotifByEmail } = require("../controllers/notificationController");
const { requestValidation } = require("../middlewares/validate.request");
const { verifyUserRequest, restrictIfGuest } = require("../middlewares/user.auth");
const notificationRouter = express.Router();

notificationRouter.get("/notification",verifyUserRequest,restrictIfGuest,getAllTopicNotifs);

// notificationRouter.post("/notification/send/test",sendTestNotifToDevice);

notificationRouter.post("/notification/send",sendNotifByEmail);
// notificationRouter.post("/notification/send/all",sendToAllValidate,requestValidation, sendToAll);

module.exports = notificationRouter;
