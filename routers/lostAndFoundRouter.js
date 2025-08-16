import express from "express";
import * as LostAndFoundControllers from "../controllers/lostAndFoundControllers.js";
import { restrictIfGuest, verifyUserRequest } from "../middlewares/user.auth.js";

const LostAndFoundRouter = express.Router();

LostAndFoundRouter.get("/lost", verifyUserRequest, LostAndFoundControllers.getLostDetails);

LostAndFoundRouter.get("/lostPage", verifyUserRequest, LostAndFoundControllers.getLostPageDetails);

LostAndFoundRouter.post("/lost", verifyUserRequest, restrictIfGuest, LostAndFoundControllers.postLostDetails);

LostAndFoundRouter.post(
    "/lost/remove", verifyUserRequest, restrictIfGuest, LostAndFoundControllers.postLostRemoveDetails
);

LostAndFoundRouter.get("/found", verifyUserRequest, LostAndFoundControllers.getfoundDetails);

LostAndFoundRouter.get("/foundPage", verifyUserRequest, LostAndFoundControllers.getFoundPageDetails);

LostAndFoundRouter.post("/found", verifyUserRequest, restrictIfGuest, LostAndFoundControllers.postfoundDetails);

LostAndFoundRouter.put("/found", verifyUserRequest, restrictIfGuest, LostAndFoundControllers.updateFoundDetails);

LostAndFoundRouter.post(
    "/found/remove", verifyUserRequest, restrictIfGuest, LostAndFoundControllers.postFoundRemoveDetails
);

LostAndFoundRouter.post("/found/claim", verifyUserRequest, restrictIfGuest, LostAndFoundControllers.claimFoundItem);

LostAndFoundRouter.delete("/found", verifyUserRequest, restrictIfGuest, LostAndFoundControllers.deleteFoundAll);

LostAndFoundRouter.post("/lnf/myads", verifyUserRequest, restrictIfGuest, LostAndFoundControllers.getMyAds);

export default LostAndFoundRouter;
