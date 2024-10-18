const express = require("express");
const { verifyUserRequest } = require("../middlewares/user.auth");
const { getHospitalTimetable } = require("../controllers/hospitalTimetableController");

const hospitalTimetableRouter = express.Router();

hospitalTimetableRouter.get('/hospital/getTimetable', verifyUserRequest, getHospitalTimetable);

module.exports = hospitalTimetableRouter;