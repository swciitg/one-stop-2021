import express from "express";
import { verifyUserRequest } from "../middlewares/user.auth.js";
import { getHospitalContacts } from "../controllers/hospitalContactController.js";

const hospitalContactRouter = express.Router();

hospitalContactRouter.get('/hospital/getContacts', verifyUserRequest, getHospitalContacts);

export default hospitalContactRouter;