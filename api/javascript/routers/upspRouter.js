const express = require("express");
const upload = require("../helpers/multer_single");
const upspRouter = express.Router();
upspRouter.post("/upsp/file-upload",upload.single("file"),(req,res) => {
    res.json({"sucess" : true,"filename" : req.body.filename});
});

module.exports = upspRouter;