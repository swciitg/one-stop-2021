import express from "express";
import { verifyUserRequest } from "../middlewares/user.auth.js";
import { getHospitalTimetable } from "../controllers/hospitalTimetableController.js";

const hospitalTimetableRouter = express.Router();

hospitalTimetableRouter.get('/hospital/getTimetable', verifyUserRequest, getHospitalTimetable);

export default hospitalTimetableRouter;