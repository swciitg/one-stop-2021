const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");
const doctorModel = require("../models/doctorModel")

let mailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.UPSP_EMAIL,
        pass: process.env.UPSP_EMAIL_PASSWORD
    }
});

//Pharmacy Feedback section
//Tested and working
exports.pharmacyFeedbackSubmit = async (req, res) => {
    try {
        const {
            patientEmail, 
            patientName, 
            prescDate, 
            numNotAvailableMedicines, 
            notAvailableMedicines,
            patientHostel, 
            mobile,
            remarks
        } = req.body;
        console.log(req.files);
        if (!req.body.files) {
            return res.status(400).send("No file uploaded.");
        }
        // console.log("body se pahle...")
        console.log(req.body);
        // console.log("body ke baad...")
        
        let selectedAttachments = [];
        req.body.files.forEach((element,index) => {
            let filepath = __dirname + "/../files_folder/pharmacyFeedback_files/" + element;
            if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
            else console.log("not exists");
        });

        console.log(selectedAttachments)

        let mailDetails = {
            from : process.env.UPSP_EMAIL ,
            // to : ["vp@iitg.ac.in", "gensec_welfare@iitg.ac.in", "mangal@iitg.ac.in" ] , //hospital-section and pharmacy mail to be added
            to : ["r.kareddy@iitg.ac.in", "m.raza@iitg.ac.in"] , //hospital-section and pharmacy mail to be added
            cc : patientEmail,
            subject : "New Pharmacy Feedback",
            attachments: selectedAttachments,
            html : `
                <div>
                    <div style="margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 10px; padding: 0;">Medical Details : </h3>
                        <ul style="list-style-type: none; padding: 0; margin: 0 0 0 10px;">
                            <li><strong>Date of Prescription: </strong> ${prescDate}</li>
                            <li><strong>No. of Unavailable Medications : </strong> ${numNotAvailableMedicines}</li>
                            <li><strong>Names of Unavailable Medications :</strong> ${notAvailableMedicines}</li>
                        </ul>
                        <p style="margin: 0 0 0 10px ; padding: 0;"><strong>Remarks: </strong>${remarks}</p>
                    </div>
                    <div>
                        <h3 style="margin: 0 0 5px 10px; padding: 0;">Patient's Details : </h3>
                        <ul style="list-style-type: none; padding: 0; margin: 0 0 0 10px;">
                            <li><strong>Patient Name :</strong> ${patientName}</li>
                            <li><strong>Email :</strong> ${patientEmail}</li>
                            <li><strong>Hostel :</strong> ${patientHostel},   <strong>Phone No :</strong> ${mobile}</li>
                        </ul>
                    </div>
                </div>
            `
        }

        mailTransporter.sendMail(mailDetails,(err,res) => {
            console.log(err);
        });

        res.json({"success" : true});

    } catch (error) {
        console.log(error.message);
    }
}


exports.fetchDoctorsList = async (req, res) => {
    try {
        const doctors = await doctorModel.find();
        // const doctors = allContacts.filter(contact => contact.category !== 'Miscellaneous')
        res.json(doctors);
    } catch (error) {
        console.error("Error fetching doctors list:", err.message);
        res.status(500).json({ error: "Failed to fetch doctors list" });
    }
}

//Doctor Feedback Section
//Tested And working
exports.doctorsFeedbackSubmit = async(req, res) => {
    try {
        const {doctorName, doctorDegree, remarks, patientName, patientEmail, patientHostel, mobile} = req.body;

        // For sending attatchments along with mail
        let selectedAttachments = [];
        req.body.files.forEach((element,index) => {
            let filepath = __dirname + "/../files_folder/doctorFeedbackForms_files/" + element;
            if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
            else console.log("not exists");
        });

        let mailDetails = {
            from: process.env.UPSP_EMAIL,
            // to : ["vp@iitg.ac.in", "gensec_welfare@iitg.ac.in", "mangal@iitg.ac.in" ] , //hospital-section mail to be added  
            to : ["r.kareddy@iitg.ac.in", "m.raza@iitg.ac.in"] ,
            cc: patientEmail, // Send a copy to the patient
            subject: "New Doctor's Feedback",
            attachments: selectedAttachments,
            html: `
                <div>
                    <div style="margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 10px; padding: 0;">Doctor Feedback :  </h3>
                        <ul style="list-style-type: none; padding: 0; margin: 0 0 0 10px;">
                            <li><strong>${doctorName}, ${doctorDegree} </strong></li>
                        </ul>
                        <p style="margin: 0 0 0 10px ; padding: 0;"><strong>Remarks: </strong>${remarks}</p>
                    </div>
                    <div>
                        <h3 style="margin: 0 0 5px 10px; padding: 0;">Patient's Details : </h3>
                        <ul style="list-style-type: none; padding: 0; margin: 0 0 0 10px;">
                            <li><strong>Patient Name:</strong> ${patientName}</li>
                            <li><strong>Email:</strong> ${patientEmail}</li>
                            <li><strong>Hostel:</strong> ${patientHostel},   <strong>Phone No:</strong> ${mobile}</li>
                        </ul>
                    </div>
                </div>
            `
        }; 

        mailTransporter.sendMail(mailDetails,(err,res) => {
            console.log(err);
        });

        res.json({"success" : true});

    } catch (error) {
        console.log(err.message)
    }
}

// Services Feedback Section
// Tested and working
exports.servicesFeedbackSubmit = async(req, res) => {
    try {
        const {remarks, userEmail, userName, userHostel, mobile} = req.body;
        console.log(req.files);
        // if (!req.files) {
        //     return res.status(400).send("No file uploaded.");
        // }
        // console.log("body se pahle..")
        console.log(req.body);
        // console.log("body ke bad..")

        // For sending attatchments along with mail
        let selectedAttachments = [];
        req.body.files.forEach((element,index) => {
            let filepath = __dirname + "/../files_folder/doctorFeedbackForms_files/" + element;
            if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
            else console.log("not exists");
        });

        console.log(selectedAttachments)

        let mailDetails = {
            from : process.env.UPSP_EMAIL ,
            // to : ["vp@iitg.ac.in", "gensec_welfare@iitg.ac.in", "mangal@iitg.ac.in" ] , //hospital-section mail to be added
            to : ["r.kareddy@iitg.ac.in", "m.raza@iitg.ac.in"] ,
            cc : userEmail,
            subject : "New Hospital Feedback",
            attachments: selectedAttachments,
            html : `
                <div>
                    <div style="margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 10px; padding: 0;">Hospital Services Feedback : </h3>
                        <p style="margin: 0 0 0 10px ; padding: 0;"><strong>Discription : </strong>${remarks}</p>
                    </div>
                    <div>
                        <ul style="list-style-type: none; padding: 0; margin: 0 0 0 10px;">
                            <li><strong>Patient Name:</strong> ${userName}</li>
                            <li><strong>Email:</strong> ${userEmail}</li>
                            <li><strong>Hostel:</strong> ${userHostel},   <strong>Phone No:</strong> ${mobile}</li>
                        </ul>
                    </div>
                </div>
            `
        }

        mailTransporter.sendMail(mailDetails,(err,res) => {
            console.log(err);
        });

        res.json({"success" : true});

    } catch (error) {
        console.log(error.message);
    }
}
