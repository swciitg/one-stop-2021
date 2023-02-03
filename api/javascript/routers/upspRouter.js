const express = require("express");
const { submitUpspForm } = require("../controllers/upspController");
const upload = require("../helpers/multer_single");
const upspRouter = express.Router();

upspRouter.post("/upsp/file-upload",upload.single("file"),(req,res) => {
    res.json({"sucess" : true,"filename" : req.body.filename});
});

upspRouter.post("/upsp/submit-request",submitUpspForm);

module.exports = upspRouter;