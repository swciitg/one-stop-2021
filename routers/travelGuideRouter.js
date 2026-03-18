import express from "express";
import * as travelGuideController from "../controllers/travelGuideController.js";
import { verifyUserRequest } from "../middlewares/user.auth.js";

const travelGuideRouter = express.Router();

travelGuideRouter.get("/travel-guide", verifyUserRequest, travelGuideController.getAllTravelGuides);
travelGuideRouter.get("/travel-guide/:id", verifyUserRequest, travelGuideController.getTravelGuideById);
travelGuideRouter.post("/travel-guide", verifyUserRequest, travelGuideController.createTravelGuide);
travelGuideRouter.put("/travel-guide/:id", verifyUserRequest, travelGuideController.updateTravelGuide);
travelGuideRouter.delete("/travel-guide/:id", verifyUserRequest, travelGuideController.deleteTravelGuide);

export { travelGuideRouter };
