import express from "express";
import * as Controller from "../controllers/timingController.js";
import { verifyUserRequest } from "../middlewares/user.auth.js";

const timingRouter = express.Router();

timingRouter.get("/ferrytimings", verifyUserRequest, Controller.getferrytiming);
timingRouter.get("/busStops", verifyUserRequest, Controller.getbusStop);

export default timingRouter;
