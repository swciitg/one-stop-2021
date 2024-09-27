const express = require("express");
const upload = require("../helpers/multer_single");
const { restrictIfGuest, verifyUserRequest } = require("../middlewares/user.auth");
const { submitHabComplaint } = require("../controllers/habcomplaintController");
const habcomplaintRouter = express.Router();

habcomplaintRouter.post("/hab-complaint/file-upload",verifyUserRequest,upload.single("file"),(req,res) => {
    res.json({"sucess" : true,"filename" : req.body.filename});
});
habcomplaintRouter.post("/hab-complaint/submit-request",verifyUserRequest,restrictIfGuest,submitHabComplaint);

module.exports = upspRouter;