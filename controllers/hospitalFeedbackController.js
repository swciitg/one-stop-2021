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
            rollNo,
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
            let filepath = __dirname + "/../files_folder/pharmacyFeedbackForms_files/" + element;
            if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
            else console.log("not exists");
        });

        console.log(selectedAttachments)

        let mailDetails = {
            from : process.env.UPSP_EMAIL ,
            // to : ["vp@iitg.ac.in", "gensec_welfare@iitg.ac.in", "mangal@iitg.ac.in" ] , //hospital-section and pharmacy mail to be added
            to : ["r.kareddy@iitg.ac.in", "m.raza@iitg.ac.in"] ,
            cc : patientEmail,
            subject : "New Pharmacy Feedback",
            attachments: selectedAttachments,
            html : `
        <html>
        <body>
            <table border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; width: 100%; max-width: 600px; border-collapse: collapse; border: 1px solid #dddddd; margin: 0 auto;">
                <tr style="background-color: #f7f7f7;">
                    <td style="padding: 20px;">
                        <h2 style="text-align: center;">COMPLAINT/FEEDBACK RECEIVED</h2>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                        <div>
                            <h3 style="margin: 0 0 10px 0; padding: 0;">Medical Details : </h3>
                            <ul style="list-style-type: none; padding: 0; margin: 0;">
                                <li><strong>Date of Prescription: </strong> ${prescDate}</li>
                                <li><strong>No. of Unavailable Medications : </strong> ${numNotAvailableMedicines}</li>
                                <li><strong>Names of Unavailable Medications :</strong> ${notAvailableMedicines}</li>
                            </ul>
                            <p style="margin: 10px 0 0 0 ; padding: 0; text-align: justify;"><strong>Description : </strong>${remarks}</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                        <h3>Complainant Information or Feedback Provider</h3>
                        <p><strong>Name:</strong> ${patientName} (${patientEmail})<br>
                        <strong>Roll No.:</strong> ${rollNo}<br>
                        <strong>Hostel:</strong> ${patientHostel}<br>
                        <strong>Phone No.:</strong>${mobile}</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px;">
                        <p><strong>Note:</strong> PFA relevant complaint proofs (if uploaded by ${patientName}).</p>
                    </td>
                </tr>
                <!-- Footer -->
                <tr>
                    <td style="padding: 20px; border-top: 1px solid #dddddd;">
                        <p style="margin-top: 40px; text-align: start;">
                            Thanks and Regards,<br>
                            <strong>Team SWC</strong><br>
                            Indian Institute of Technology, Guwahati<br>
                            Guwahati, Assam, 781039
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>           `
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
        console.error("Error fetching doctors list:", error.message);
        res.status(500).json({ error: "Failed to fetch doctors list" });
    }
}

//Doctor Feedback Section
//Tested And working
exports.doctorsFeedbackSubmit = async(req, res) => {
    try {
        const {doctorName, doctorDegree, remarks, patientName, patientEmail, patientHostel, mobile, rollNo} = req.body;

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
            <html>
            <body>
            <table border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; width: 100%; max-width: 600px; border-collapse: collapse; border: 1px solid #dddddd; margin: 0 auto;">
                <tr style="background-color: #f7f7f7;">
                    <td style="padding: 20px;">
                        <h2 style="text-align: center;">COMPLAINT/FEEDBACK RECEIVED</h2>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                        <div>
                            <h3 style="margin: 0 0 10px 10px; padding: 0;">Doctor Feedback :  </h3>
                        <ul style="list-style-type: none; padding: 0; margin: 0 0 0 10px;">
                            <li><strong>${doctorName}, ${doctorDegree} </strong></li>
                        </ul>
                        <p style="margin: 0 0 0 10px ; padding: 0;"><strong>Description : </strong>${remarks}</p>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                        <h3>Complainant Information or Feedback Provider</h3>
                        <p><strong>Name:</strong> ${patientName} (${patientEmail})<br>
                        <strong>Roll No.:</strong> ${rollNo}<br>
                        <strong>Hostel:</strong> ${patientHostel}<br>
                        <strong>Phone No.:</strong>${mobile}</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px;">
                        <p><strong>Note:</strong> PFA relevant complaint proofs (if uploaded by ${patientName}).</p>
                    </td>
                </tr>
                <!-- Footer -->
                <tr>
                    <td style="padding: 20px; border-top: 1px solid #dddddd;">
                        <p style="margin-top: 40px; text-align: start;">
                            Thanks and Regards,<br>
                            <strong>Team SWC</strong><br>
                            Indian Institute of Technology, Guwahati<br>
                            Guwahati, Assam, 781039
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>           
            `
        }; 

        mailTransporter.sendMail(mailDetails,(err,res) => {
            console.log(err);
        });

        res.json({"success" : true});

    } catch (error) {
        console.log(error.message)
    }
}

// Services Feedback Section
// Tested and working
exports.servicesFeedbackSubmit = async(req, res) => {
    try {
        const {remarks, userEmail, userName, userHostel, mobile, rollNo} = req.body;
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
            let filepath = __dirname + "/../files_folder/servicesFeedbackForms_files/" + element;
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
        <html>
        <body>
            <table border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; width: 100%; max-width: 600px; border-collapse: collapse; border: 1px solid #dddddd; margin: 0 auto;">
                <tr style="background-color: #f7f7f7;">
                    <td style="padding: 20px;">
                        <h2 style="text-align: center;">COMPLAINT/FEEDBACK RECEIVED</h2>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                        <div>
                            <div>
                                <h3 style="margin: 0 0 10px 0; padding: 0;">Hospital Services Feedback : </h3>
                                <p style="margin: 0 ; padding: 0;"><strong>Discription : </strong>${remarks}</p>
                            </div>
                        </div>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                        <h3>Complainant Information or Feedback Provider</h3>
                        <p><strong>Name:</strong> ${userName} (${userEmail})<br>
                        <strong>Roll No.:</strong> ${rollNo}<br>
                        <strong>Hostel:</strong> ${userHostel}<br>
                        <strong>Phone No.:</strong>${mobile}</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px;">
                        <p><strong>Note:</strong> PFA relevant complaint proofs (if uploaded by ${userName}).</p>
                    </td>
                </tr>
                <!-- Footer -->
                <tr>
                    <td style="padding: 20px; border-top: 1px solid #dddddd;">
                        <p style="margin-top: 40px; text-align: start;">
                            Thanks and Regards,<br>
                            <strong>Team SWC</strong><br>
                            Indian Institute of Technology, Guwahati<br>
                            Guwahati, Assam, 781039
                        </p>
                    </td>
                </tr>
            </table>
        </body>
        </html>
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
