import express from "express";
import upload from "../helpers/multer_single_hab.js";
import { submitHabComplaint } from "../controllers/habComplaintController.js";
import { restrictIfGuest, verifyUserRequest } from "../middlewares/user.auth.js";

const habComplaintRouter = express.Router();

habComplaintRouter.post("/hab-complaint/file-upload", verifyUserRequest, upload.single("file"), (req, res) => {
    res.json({"sucess" : true, "filename" : req.body.filename});
});

habComplaintRouter.post("/hab-complaint/submit-request", verifyUserRequest, restrictIfGuest, submitHabComplaint);

export default habComplaintRouter;