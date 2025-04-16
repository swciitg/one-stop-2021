import express from "express";
import * as campusTravelController from "../controllers/campusTravelController.js";
import { restrictIfGuest, verifyUserRequest } from "../middlewares/user.auth.js";

const campusTravelRouter = express.Router();

campusTravelRouter.get("/campus-travel", verifyUserRequest, campusTravelController.getTravelPosts);
campusTravelRouter.get("/campus-travel/myads", verifyUserRequest, restrictIfGuest, campusTravelController.getMyAds);
campusTravelRouter.post("/campus-travel", verifyUserRequest, restrictIfGuest, campusTravelController.postTravel);
campusTravelRouter.get("/campus-travel/chat", verifyUserRequest, campusTravelController.getTravelPostChatReplies);
campusTravelRouter.post("/campus-travel/chat", verifyUserRequest, restrictIfGuest, campusTravelController.postReplyChat);
campusTravelRouter.delete("/campus-travel", verifyUserRequest, restrictIfGuest, campusTravelController.deleteTravelPost);
campusTravelRouter.delete("/campus-travel/all", verifyUserRequest, restrictIfGuest, campusTravelController.deleteAllTravelPosts);

export { campusTravelRouter };