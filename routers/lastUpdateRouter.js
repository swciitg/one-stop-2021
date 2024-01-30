const express = require("express");

const lastUpdateRouter = express.Router();
const Controller = require("../controllers/lastUpdateController.js");
const {verifyUserRequest} = require('../middlewares/user.auth');
lastUpdateRouter.post("/lastupdate/timetable",verifyUserRequest, Controller.updatetimetableInLastUpdateDocument);

module.exports =  lastUpdateRouter;