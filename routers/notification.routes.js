import express from "express";
import { getAllTopicNotifs, sendNotifByEmail, sendNotifByEmailList } from "../controllers/notificationController.js";
import { requestValidation } from "../middlewares/validate.request.js";
import { verifyUserRequest, restrictIfGuest } from "../middlewares/user.auth.js";

const notificationRouter = express.Router();

notificationRouter.get("/notification", verifyUserRequest, restrictIfGuest, getAllTopicNotifs);

// notificationRouter.post("/notification/send/test",sendTestNotifToDevice);

notificationRouter.post("/notification/sendone", sendNotifByEmail);
// notificationRouter.post("/notification/send/all",sendToAllValidate,requestValidation, sendToAll);
notificationRouter.post("/notifications/send", sendNotifByEmailList);

export default notificationRouter;
