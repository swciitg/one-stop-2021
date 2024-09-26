const nodemailer = require("nodemailer");
const fs = require("fs");
const path = require("path");

let mailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.UPSP_EMAIL,
        pass: process.env.UPSP_EMAIL_PASSWORD
    }
});

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

