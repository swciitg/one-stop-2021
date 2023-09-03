const express = require("express");

const updateRouter = express.Router();
const Controller = require("../controllers/updateController");

updateRouter.get("/lastDataUpdate", Controller.getLastUpdate);

module.exports = { updateRouter };
