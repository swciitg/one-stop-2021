const express = require("express");
const { submitUpspForm } = require("../controllers/upspController");
const upload = require("../helpers/multer_single");
const { restrictIfGuest, verifyUserRequest } = require("../middlewares/user.auth");
const upspRouter = express.Router();

upspRouter.post("/upsp/file-upload",verifyUserRequest,upload.single("file"),(req,res) => {
    console.log(req.body)
    console.log(req.files)
    console.log(req)
    res.json({"sucess" : true,"filename" : req.body.filename});
});

upspRouter.post("/upsp/submit-request",verifyUserRequest,restrictIfGuest,submitUpspForm);

module.exports = upspRouter;