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
exports.pharmacyFeedbackSubmit = async (req, res) => {
    try {
        const {
            patientEmail, 
            patientName, 
            prescDate, 
            prescMedicineNumber, 
            availableMedicine, 
            notProvidedMedicineInADay, 
            patientHostel, 
            mobile,
            remarks
        } = req.body;
        
        // For sending attatchments along with mail
        let selectedAttachments = [];
        req.body.files.forEach((element,index) => {
        let filepath = path.join(__dirname, "../files_folder/pharmacyForms_files/", element);
        if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
        else console.log("not exists");
        });

        let mailDetails = {
            from : process.env.UPSP_EMAIL ,
            to : ["vp@iitg.ac.in", "gensec_welfare@iitg.ac.in", "mangal@iitg.ac.in" ] , //hospital-section and pharmacy mail to be added
            cc : patientEmail,
            subject : "New Pharmacy Feedback",
            attachments: selectedAttachments,
            html : `
                <div>
                    <div style="margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 10px; padding: 0;">Medical Details : </h3>
                        <ul style="list-style-type: none; padding: 0; margin: 0 0 0 10px;">
                            <li><strong>Date of Prescription: </strong> ${prescDate}</li>
                            <li><strong>Number of Medicines Prescribed: </strong> ${prescMedicineNumber}</li>
                            <li><strong>Number of Medicines Available:</strong> ${availableMedicine}</li>
                            <li><strong>Number of Medicines not Available at the time of consulting:</strong> ${availableMedicine}</li>
                            <li><strong>Medicines Not Made Available within 24 Hours:</strong> ${notProvidedMedicineInADay}</li>
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
        }

        mailTransporter.sendMail(mailDetails,(err,res) => {
            console.log(err);
        });

        res.json({"success" : true});

    } catch (error) {
        console.log(error.message);
    }
}


//Doctor Feedback Section
exports.fetchDoctorsList = async (req, res) => {
    try {
        const doctors  = await doctorModel.find();
        res.json(doctors);
    } catch (error) {
        res.status(500).json({ error: "Unable to fetch doctors" });
    }
}

exports.doctorsFeedbackSubmit = async(req, res) => {
    try {
        const {doctorname, doctorDegree, patientName, patientEmail, patientHostel, mobile, remarks} = req.body;

        // For sending attatchments along with mail
        let selectedAttachments = [];
        req.body.files.forEach((element,index) => {
        let filepath = path.join(__dirname, "../files_folder/doctorFeedbackForms_files/", element);
        if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
        else console.log("not exists");
        });

        let mailDetails = {
            from: process.env.UPSP_EMAIL,
            to : ["vp@iitg.ac.in", "gensec_welfare@iitg.ac.in", "mangal@iitg.ac.in" ] , //hospital-section mail to be added  
            cc: patientEmail, // Send a copy to the patient
            subject: "New Doctor's Feedback",
            attachments: selectedAttachments,
            html: `
                <div>
                    <div style="margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 10px; padding: 0;">Doctor Feedback :  </h3>
                        <ul style="list-style-type: none; padding: 0; margin: 0 0 0 10px;">
                            <li><strong>${doctorname}, ${doctorDegree} </strong></li>
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
exports.servicesFeedbackSubmit = async(req, res) => {
    try {
        const {remarks, userEmail, userName, userHostel, mobile} = req.body;

        // For sending attatchments along with mail
        let selectedAttachments = [];
        req.body.files.forEach((element,index) => {
        let filepath = path.join(__dirname, "../files_folder/servicesFeedbackForms_files/", element);
        if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
        else console.log("not exists");
        });

        let mailDetails = {
            from : process.env.UPSP_EMAIL ,
            to : ["vp@iitg.ac.in", "gensec_welfare@iitg.ac.in", "mangal@iitg.ac.in" ] , //hospital-section mail to be added
            cc : userEmail,
            subject : "New Hospital Feedback",
            attachments: selectedAttachments,
            html : `
                <div>
                    <div style="margin-bottom: 20px;">
                        <h3 style="margin: 0 0 10px 10px; padding: 0;">Hospital Services Feedback : </h3>
                        <p style="margin: 0 0 0 10px ; padding: 0;"><strong>Remarks: </strong>${remarks}</p>
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
