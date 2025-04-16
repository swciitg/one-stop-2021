import express from "express";
import { pharmacyFeedbackSubmit, servicesFeedbackSubmit, doctorsFeedbackSubmit, fetchDoctorsList } from "../controllers/hospitalFeedbackController.js";
import uploadPharmacy from "../helpers/multer_pharmacy.js";
import uploadDoctor from "../helpers/multer_doctorsFeedback.js";
import uploadServices from "../helpers/multer_hospitalServicesFeedback.js";
import { verifyUserRequest } from "../middlewares/user.auth.js";

const hospitalFeedbackRouter = express.Router();

// pharmacy
hospitalFeedbackRouter.post("/feedback/pharmacyFeedback-submit", verifyUserRequest, pharmacyFeedbackSubmit);

hospitalFeedbackRouter.post("/pharmacyFeedback/file-upload", verifyUserRequest, uploadPharmacy.array("file", 3), (req, res) => {
    res.json({"sucess" : true, "filename" : req.body.filename});
});


// services
hospitalFeedbackRouter.post("/feedback/servicesFeedback-submit", verifyUserRequest, servicesFeedbackSubmit);

hospitalFeedbackRouter.post("/servicesFeedback/file-upload", verifyUserRequest, uploadServices.array("file", 3), (req, res) => {
    res.json({"sucess" : true, "filename" : req.body.filename});
});


// to fetch doctors list(tested and working)
hospitalFeedbackRouter.get("/getDoctors", verifyUserRequest, fetchDoctorsList);


//doctor feedback 
hospitalFeedbackRouter.post("/feedback/doctorsFeedback-submit", verifyUserRequest, doctorsFeedbackSubmit);

hospitalFeedbackRouter.post("/doctorsFeedback/file-upload", verifyUserRequest, uploadDoctor.array("file", 3), (req, res) => {
    res.json({"sucess" : true, "filename" : req.body.filename});
});

export default hospitalFeedbackRouter;