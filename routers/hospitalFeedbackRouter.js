const express = require("express");
const {pharmacyFeedbackSubmit, servicesFeedbackSubmit, doctorsFeedbackSubmit, fetchDoctorsList} = require("../controllers/hospitalFeedbackController");
const uploadPharmacy = require("../helpers/multer_pharmacy");
const uploadDoctor = require("../helpers/multer_doctorsFeedback") 
const uploadServices = require("../helpers/multer_hospitalServicesFeedback") 
const { verifyUserRequest } = require("../middlewares/user.auth");

const hospitalFeedbackRouter = express.Router();

// pharmacy
hospitalFeedbackRouter.post("/feedback/pharmacyFeedback-submit", verifyUserRequest,  uploadPharmacy.array("files", 3) , pharmacyFeedbackSubmit)

// services
hospitalFeedbackRouter.post("/feedback/servicesFeedback-submit", verifyUserRequest, uploadServices.array("files", 3) , servicesFeedbackSubmit)

// to fetch doctors list
hospitalFeedbackRouter.get("/feedback/getDoctors", verifyUserRequest, fetchDoctorsList )

//doctor feedback 
hospitalFeedbackRouter.post("/feedback/doctorsFeedback-submit", verifyUserRequest, uploadDoctor.array("files", 3), doctorsFeedbackSubmit)

module.exports = hospitalFeedbackRouter; 