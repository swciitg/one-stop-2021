const express = require("express");

const timingRouter = express.Router();
const Controller = require("../controllers/timingController");

timingRouter.get("/getferrytiming", Controller.getferrytiming);
timingRouter.post("/createferrytiming", Controller.createferrytiming);

timingRouter.get("/getbustiming", Controller.getbustiming);
timingRouter.post("/createbustiming", Controller.createbustiming);

module.exports = { timingRouter };
