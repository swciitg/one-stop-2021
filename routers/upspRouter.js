const express = require("express");
const { submitUpspForm } = require("../controllers/upspController");
const upload = require("../helpers/multer_single");
const { restrictIfGuest, verifyUserRequest } = require("../middlewares/user.auth");
const upspRouter = express.Router();

upspRouter.post("/upsp/file-upload",upload.array("files",3), (req,res) => {
    res.json({"sucess" : true,"filename" : req.body.filename});
});

upspRouter.post("/upsp/submit-request", verifyUserRequest, restrictIfGuest, submitUpspForm);

module.exports = upspRouter;