const express = require("express");
// const { routes } = require('../routes');
const { routes } = require('../routes');
const LostAndFoundControllers = require("../controllers/lostAndFoundControllers");
const LostAndFoundRouter = express.Router();
const multer = require("multer");
const fs = require("fs");
LostAndFoundRouter.get("/getImage", LostAndFoundControllers.getImage);

LostAndFoundRouter.get("/getCompressedImage", LostAndFoundControllers.getCompressedImage);

LostAndFoundRouter.get("/lost", LostAndFoundControllers.getLostDetails);

LostAndFoundRouter.get("/lostPage", LostAndFoundControllers.getLostPageDetails);

LostAndFoundRouter.post("/lost",
    LostAndFoundControllers.postLostDetails
)

LostAndFoundRouter.delete("/lost",LostAndFoundControllers.deleteLosts);

LostAndFoundRouter.get("/found", LostAndFoundControllers.getfoundDetails);

LostAndFoundRouter.get("/foundPage", LostAndFoundControllers.getFoundPageDetails);

LostAndFoundRouter.post("/found",
    LostAndFoundControllers.postfoundDetails
)

LostAndFoundRouter.post("/found/claim", LostAndFoundControllers.claimFoundItem);

LostAndFoundRouter.delete("/found",LostAndFoundControllers.deleteFounds);

module.exports = { LostAndFoundRouter: LostAndFoundRouter };
