const express = require("express");

const timingRouter = express.Router();
const Controller = require("../controllers/timingController");
const { verifyUserRequest } = require("../middlewares/user.auth");
timingRouter.get("/ferrytimings",verifyUserRequest, Controller.getferrytiming);

timingRouter.get("/busStops",verifyUserRequest, Controller.getbusStop);

module.exports =  timingRouter ;
