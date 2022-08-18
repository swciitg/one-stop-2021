const express = require("express");

const timingRouter = express.Router();
const Controller = require("../controllers/timingController");

timingRouter.get("/ferrytimings", Controller.getferrytiming);
timingRouter.post("/ferrytimings", Controller.createferrytiming);

timingRouter.get("/bustimings", Controller.getbustiming);
timingRouter.post("/bustimings", Controller.createbustiming);

module.exports = { timingRouter };
