const express = require("express");
const {pharmacyFeedbackSubmit, servicesFeedbackSubmit, doctorsFeedbackSubmit, fetchDoctorsList} = require("../controllers/hospitalFeedbackController");
const uploadPharmacy = require("../helpers/multer_pharmacy");
const uploadDoctor = require("../helpers/multer_doctorsFeedback") 
const uploadServices = require("../helpers/multer_hospitalServicesFeedback") 
const { verifyUserRequest } = require("../middlewares/user.auth");

const hospitalFeedbackRouter = express.Router();

// pharmacy
hospitalFeedbackRouter.post("/feedback/pharmacyFeedback-submit", verifyUserRequest, restrictIfGuest, uploadPharmacy.single("file") , pharmacyFeedbackSubmit)

// services
hospitalFeedbackRouter.post("/feedback/servicesFeedback-submit", verifyUserRequest, restrictIfGuest, uploadServices.single("file") , servicesFeedbackSubmit)

// to fetch doctors list
hospitalFeedbackRouter.get("/feedback/doctors", verifyUserRequest, fetchDoctorsList )

//doctor feedback 
hospitalFeedbackRouter.post("/feedback/doctorsFeedback-submit", verifyUserRequest, restrictIfGuest ,uploadDoctor.single("file"), doctorsFeedbackSubmit)

module.exports = hospitalFeedbackRouter; 