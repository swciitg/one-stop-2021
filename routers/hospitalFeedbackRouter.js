const express = require("express");
const hospitalFeedbackController = require("../controllers/hospitalFeedbackController");
const { verifyUserRequest } = require("../middlewares/user.auth");

const hospitalFeedbackRouter = express.Router();

hospitalFeedbackRouter.post("/feedback/pharmacyFeedback-submit", verifyUserRequest, restrictIfGuest, upload.single("file") , hospitalFeedbackController.pharmacyFeedbackSubmit)

module.exports = hospitalFeedbackRouter; 