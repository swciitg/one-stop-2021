import express from "express";
import { submitUpspForm } from "../controllers/upspController.js";
import upload from "../helpers/multer_single.js";
import { restrictIfGuest, verifyUserRequest } from "../middlewares/user.auth.js";

const upspRouter = express.Router();

upspRouter.post("/upsp/file-upload", verifyUserRequest, upload.array("file", 5), (req, res) => {
    console.log(req.body);
    console.log(req.files);
    console.log(req);
    res.json({ "success": true, "filename": req.body.filename });
});

upspRouter.post("/upsp/submit-request", verifyUserRequest, restrictIfGuest, submitUpspForm);

export default upspRouter;