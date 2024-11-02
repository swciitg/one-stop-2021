const nodemailer = require("nodemailer");
const fs = require("fs");
const { IITGHostelWardens, IITGHostelGSs, IITGHostelSSs, IITGHostelOffices, IITGHostelMSs } = require("../helpers/constants");

let mailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.HAB_EMAIL,
        pass: process.env.HAB_EMAIL_PASSWORD
    }
});

const serviceTos = ["hostelservices_complaints@iitg.ac.in"]  
const infraTos = ["hostelinfra_complaints@iitg.ac.in"]
const generalTos = ["hostel_complaints@iitg.ac.in"]


exports.submitHabComplaint = async (req,res) => {
    console.log(req.body);
    try {
        let recieverEmailsForCc = [req.body.email];
        
        let recieverEmailsForTo = [];
        
        if(req.body.complaintType === "Infra"){
            recieverEmailsForTo = recieverEmailsForTo.concat(infraTos)
            recieverEmailsForTo.push(IITGHostelMSs[req.body.hostel])
        }
        else if(req.body.complaintType === "General"){
            recieverEmailsForTo = recieverEmailsForTo.concat(generalTos)
        }
        else{
            recieverEmailsForTo = recieverEmailsForTo.concat(serviceTos)
            recieverEmailsForTo.push(IITGHostelSSs[req.body.hostel])
        }

        recieverEmailsForTo.push(IITGHostelGSs[req.body.hostel])
        recieverEmailsForTo.push(IITGHostelWardens[req.body.hostel])
        recieverEmailsForTo.push(IITGHostelOffices[req.body.hostel])

        let selectedAttachments = [];

        req.body.files.forEach((element,index) => {
            let filepath = __dirname + "/../files_folder/hab_complaint_files/" + element;
            if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
            else console.log("not exists");
        });

        // recieverEmailsForTo = [...new Set(recieverEmailsForTo)]; // removing redundant items from array
        // recieverEmailsForCc = [...new Set(recieverEmailsForCc)];

        console.log(recieverEmailsForTo,recieverEmailsForCc,selectedAttachments);

        let mailDetails = {
            from: process.env.HAB_EMAIL,
            subject: `${req.body.services} Feedback/Complaint ${req.body.complaintType==="Infra" ? `with complaint ID: ${req.body.complaintID}` : "" } from ${req.body.hostel} hostel by ${req.body.name} ${req.body.complaintType==="Infra" ? `on ${req.body.complaintDate}`: ""}`,
            to: recieverEmailsForTo,
            cc: recieverEmailsForCc,
            attachments: selectedAttachments,
            html: `
            <!DOCTYPE html>
            <html>
            <body>
                <table border="0" cellspacing="0" cellpadding="0" style="font-family: Arial, sans-serif; width: 100%; max-width: 600px; border-collapse: collapse; border: 1px solid #dddddd; margin: 0 auto;">
                    <tr style="background-color: #f7f7f7;">
                        <td style="padding: 20px;">
                            <h2 style="text-align: center;">COMPLAINT/FEEDBACK RECEIVED</h2>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <p>Dear ${req.body.complaintType==="Infra" ? "Maintenance" : (req.body.complaintType==="General" ? "General" : "Service")} Secretary of ${req.body.hostel} Hostel,</p>
                            <p>This is an auto-generated email based on the response submitted by <strong>${req.body.name}</strong>.</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                            <h3>Complaint/Feedback Received for:</h3>
                            <p>${req.body.services}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                            <h3>Complainant Information or Feedback Provider</h3>
                            <p>
                            <strong>Name:</strong> ${req.body.name} (${req.body.email})<br>
                            <strong>Hostel:</strong> ${req.body.hostel}<br>
                            <strong>Room No.:</strong> ${req.body.room_number}<br>
                            <strong>Phone No.:</strong> ${req.body.phone}<br>
                            ${req.body.complaintType==="Infra" ? `<strong>Complaint ID:</strong> ${req.body.complaintID}` : "" }
                            ${req.body.complaintType==="Infra" ? `<strong>Complait Date:</strong> ${req.body.complaintDate}`: ""}
                            </p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                            <h3>Problem</h3>
                            <p>${req.body.problem}</p>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding: 20px;">
                            <p><strong>Note:</strong> PFA relevant complaint proofs (if uploaded by ${req.body.name}).</p>
                        </td>
                    </tr>
                    <!-- Footer -->
                    <tr>
                        <td style="padding: 20px; border-top: 1px solid #dddddd;">
                            <p>Requesting the Hostel office to please follow up with the ${req.body.complaintType==="Infra" ? "Maintenance" : (req.body.complaintType==="General" ? "General" : "Service")} Secretary and General Secretary to ensure a response to the pending query if it remains unanswered.</p>
                            <p style="margin-top: 40px; text-align: center;">
                                Thanks and Regards,<br>
                                <strong>${req.body.complaintType==="Infra" ? "Aniket Banerjee" : (req.body.complaintType==="General" ? "" : "Himanshu Sharma")}</strong><br>
                                <strong>${req.body.complaintType==="Infra" ? "Joint Secretary, HAB(Infrastructure)" : (req.body.complaintType==="General" ? "General Secretary, HAB" : "Joint Secretary, HAB(Services)")})</strong><br>
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

        res.status(200).json({"success" : true});
    } catch (error) {
        res.status(500).json({"error": error});
    }
    
}