const express = require("express");

const timingRouter = express.Router();
const Controller = require("../controllers/timingController");

timingRouter.get("/ferrytimings", Controller.getferrytiming);
timingRouter.post("/ferrytimings", Controller.createferrytiming);
timingRouter.delete("/ferrytimings", Controller.deleteFerryStop);
timingRouter.delete("/ferrytimings/all", Controller.deleteAllFerryStop);

timingRouter.get("/bustimings", Controller.getbustiming);
timingRouter.post("/bustimings", Controller.createbustiming);
timingRouter.delete("/bustimings", Controller.deleteBusStop);
timingRouter.delete("/bustimings/all", Controller.deleteAllBusStop);

module.exports = { timingRouter };
