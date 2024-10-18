const express = require("express");
const {pharmacyFeedbackSubmit, servicesFeedbackSubmit, doctorsFeedbackSubmit, fetchDoctorsList} = require("../controllers/hospitalFeedbackController");
const uploadPharmacy = require("../helpers/multer_pharmacy");
const uploadDoctor = require("../helpers/multer_doctorsFeedback") 
const uploadServices = require("../helpers/multer_hospitalServicesFeedback") 
const { verifyUserRequest } = require("../middlewares/user.auth");

const hospitalFeedbackRouter = express.Router();

// pharmacy
hospitalFeedbackRouter.post("/feedback/pharmacyFeedback-submit" , verifyUserRequest, pharmacyFeedbackSubmit)

hospitalFeedbackRouter.post("/pharmacyFeedback/file-upload", verifyUserRequest, uploadPharmacy.array("file", 3),(req,res) => {
    res.json({"sucess" : true,"filename" : req.body.filename});
});


// services
hospitalFeedbackRouter.post("/feedback/servicesFeedback-submit", verifyUserRequest, servicesFeedbackSubmit)

hospitalFeedbackRouter.post("/servicesFeedback/file-upload", verifyUserRequest, uploadServices.array("file", 3),(req,res) => {
    res.json({"sucess" : true,"filename" : req.body.filename});
});


// to fetch doctors list(tested and working)
hospitalFeedbackRouter.get("/getDoctors", verifyUserRequest, fetchDoctorsList )


//doctor feedback 
hospitalFeedbackRouter.post("/feedback/doctorsFeedback-submit", verifyUserRequest, doctorsFeedbackSubmit)

hospitalFeedbackRouter.post("/doctorsFeedback/file-upload", verifyUserRequest, uploadDoctor.array("file", 3),(req,res) => {
    res.json({"sucess" : true,"filename" : req.body.filename});
});

module.exports = hospitalFeedbackRouter;