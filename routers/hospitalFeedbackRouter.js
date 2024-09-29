const express = require("express");
const {pharmacyFeedbackSubmit, servicesFeedbackSubmit, doctorsFeedbackSubmit, fetchDoctorsList} = require("../controllers/hospitalFeedbackController");
const uploadPharmacy = require("../helpers/multer_pharmacy");
const uploadDoctor = require("../helpers/multer_doctorsFeedback") 
const uploadServices = require("../helpers/multer_hospitalServicesFeedback") 
const { verifyUserRequest } = require("../middlewares/user.auth");

const hospitalFeedbackRouter = express.Router();

// pharmacy
hospitalFeedbackRouter.post("/feedback/pharmacyFeedback-submit" , verifyUserRequest, uploadPharmacy.array("files", 3), pharmacyFeedbackSubmit)

hospitalFeedbackRouter.post("/pharmacyFeedback/file-upload", verifyUserRequest, uploadPharmacy.array("files", 3),(req,res) => {
    res.json({"sucess" : true,"filename" : req.body.filename});
});


// services
hospitalFeedbackRouter.post("/feedback/servicesFeedback-submit",  uploadServices.array("files", 3) , servicesFeedbackSubmit)

hospitalFeedbackRouter.post("/servicesFeedback/file-upload", uploadServices.array("files", 3),(req,res) => {
    res.json({"sucess" : true,"filename" : req.body.filename});
});


// to fetch doctors list
hospitalFeedbackRouter.get("/getDoctors", verifyUserRequest, fetchDoctorsList )


//doctor feedback 
hospitalFeedbackRouter.post("/feedback/doctorsFeedback-submit", verifyUserRequest, uploadDoctor.array("files", 3), doctorsFeedbackSubmit)

module.exports = hospitalFeedbackRouter; 