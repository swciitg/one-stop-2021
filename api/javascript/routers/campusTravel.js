const express = require("express");
const campusTravelRouter = express.Router();
const campusTravelController = require("../controllers/campusTravelController");
campusTravelRouter.post("/campus-travel",campusTravelController.postTravel);
campusTravelRouter.get("/campus-travel",campusTravelController.getTravelPosts);
campusTravelRouter.delete("/campus-travel",campusTravelController.deleteAllTravelPosts);
module.exports = {campusTravelRouter : campusTravelRouter};