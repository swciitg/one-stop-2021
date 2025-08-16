import express from "express";
import { getUserByRollSecure, getUserByRollSecureValidate } from "../controllers/onestopUserController.js";

const gatelogRouter = express.Router();

// gatelogRouter.get("/test" , (req, res) => {
//     res.json({ message: "Gatelog Router is working!" });
// });


gatelogRouter.get("/gatelog/secure", getUserByRollSecureValidate, getUserByRollSecure);

export default gatelogRouter;