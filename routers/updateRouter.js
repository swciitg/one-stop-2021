import express from "express";
import * as Controller from "../controllers/updateController.js";

const updateRouter = express.Router();

updateRouter.get("/lastDataUpdate", Controller.getLastUpdate);

export { updateRouter };
