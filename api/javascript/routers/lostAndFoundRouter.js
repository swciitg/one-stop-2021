const express = require("express");
// const { routes } = require('../routes');
const { routes } = require('../routes');
const LostAndFoundControllers = require("../controllers/lostAndFoundControllers");
const LostAndFoundRouter = express.Router();
const multer = require("multer");
const fs = require("fs");
const { restrictIfGuest, verifyUserRequest } = require("../middlewares/user.auth");
LostAndFoundRouter.use(verifyUserRequest);
LostAndFoundRouter.get("/getImage", LostAndFoundControllers.getImage);

LostAndFoundRouter.get("/getCompressedImage", LostAndFoundControllers.getCompressedImage);

LostAndFoundRouter.get("/lost", LostAndFoundControllers.getLostDetails);

LostAndFoundRouter.get("/lostPage", LostAndFoundControllers.getLostPageDetails);

LostAndFoundRouter.post("/lost",restrictIfGuest,LostAndFoundControllers.postLostDetails
)

LostAndFoundRouter.post(
    "/lost/remove",restrictIfGuest,LostAndFoundControllers.postLostRemoveDetails
  );

LostAndFoundRouter.delete("/lost",restrictIfGuest, LostAndFoundControllers.deleteLostAll);

LostAndFoundRouter.get("/found", LostAndFoundControllers.getfoundDetails);

LostAndFoundRouter.get("/foundPage", LostAndFoundControllers.getFoundPageDetails);

LostAndFoundRouter.post("/found",restrictIfGuest,LostAndFoundControllers.postfoundDetails
);

LostAndFoundRouter.put("/found",restrictIfGuest,LostAndFoundControllers.updateFoundDetails
);

LostAndFoundRouter.post(
    "/found/remove",restrictIfGuest,LostAndFoundControllers.postFoundRemoveDetails
  );

LostAndFoundRouter.post("/found/claim",restrictIfGuest, LostAndFoundControllers.claimFoundItem);

LostAndFoundRouter.delete("/found",restrictIfGuest, LostAndFoundControllers.deleteFoundAll);

LostAndFoundRouter.post("/lnf/myads",restrictIfGuest, LostAndFoundControllers.getMyAds);

module.exports = { LostAndFoundRouter: LostAndFoundRouter };
