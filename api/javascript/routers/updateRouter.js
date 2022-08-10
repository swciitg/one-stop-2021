const express = require("express");

const updateRouter = express.Router();
const Controller = require("../controllers/updateController");

updateRouter.get("/getLastUpdate", Controller.getLastUpdate);
updateRouter.get("/update", Controller.update);

module.exports = { updateRouter };
