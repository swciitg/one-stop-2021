const express = require("express");
const campusTravelRouter = express.Router();
const campusTravelController = require("../controllers/campusTravelController");
campusTravelRouter.get("/campus-travel",campusTravelController.getTravelPosts);
campusTravelRouter.get("/campus-travel/myads",campusTravelController.getMyAds);
campusTravelRouter.post("/campus-travel",campusTravelController.postTravel);
campusTravelRouter.get("/campus-travel/chat",campusTravelController.getTravelPostChatReplies);
campusTravelRouter.post("/campus-travel/chat",campusTravelController.postReplyChat);
campusTravelRouter.delete("/campus-travel/",campusTravelController.deleteTravelPost);
campusTravelRouter.delete("/campus-travel/all",campusTravelController.deleteAllTravelPosts);
module.exports = {campusTravelRouter : campusTravelRouter};