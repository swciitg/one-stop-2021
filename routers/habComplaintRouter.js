
const express = require("express");
const upload = require("../helpers/multer_single");
const { submitHabComplaint } = require("../controllers/habComplaintController");
const { restrictIfGuest, verifyUserRequest } = require("../middlewares/user.auth");
const habComplaintRouter = express.Router();

habComplaintRouter.post("/hab-complaint/file-upload",verifyUserRequest,upload.array("file",5),(req,res) => {
    res.json({"sucess" : true,"filename" : req.body.filename});
});

habComplaintRouter.post("/hab-complaint/submit-request",verifyUserRequest,restrictIfGuest,submitHabComplaint);

module.exports = habComplaintRouter;