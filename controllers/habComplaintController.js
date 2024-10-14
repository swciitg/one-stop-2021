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

    let recieverEmailsForCc = [req.body.email];
    
    let recieverEmailsForTo = [];

    req.body.hostel.forEach((element) => recieverEmailsForTo.push(IITGHostelGSs[element]))
    req.body.hostel.forEach((element) => recieverEmailsForTo.push(IITGHostelWardens[element]))
    req.body.hostel.forEach((element) => recieverEmailsForTo.push(IITGHostelOffices[element]))


    if(req.body.services === "Infra"){
        req.body.hostel.forEach((element) => recieverEmailsForTo.push(IITGHostelMSs[element]))
        recieverEmailsForTo = recieverEmailsForTo.concat(infraTos)
    }
    else if(req.body.services === "General"){
        recieverEmailsForTo = recieverEmailsForTo.concat(generalTos)
    }
    else{
        req.body.hostel.forEach((element) => recieverEmailsForTo.push(IITGHostelSSs[element]))
        recieverEmailsForTo = recieverEmailsForTo.concat(serviceTos)
    }

    let selectedAttachments = [];

    req.body.files.forEach((element,index) => {
        let filepath = __dirname + "/../files_folder/hab_complaint_files/" + element;
        if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
        else console.log("not exists");
    });

    recieverEmailsForTo = [...new Set(recieverEmailsForTo)]; // removing redundant items from array
    recieverEmailsForCc = [...new Set(recieverEmailsForCc)];

    console.log(recieverEmailsForTo,recieverEmailsForCc,selectedAttachments);

    let mailDetails = {
        from: process.env.HAB_EMAIL,
        subject: `${req.body.services} Feedback/Complaint ${req.body.services==="Infra" ? `with complaint ID: ${req.body.complaintID}` : "" } from ${req.body.hostel} hostel by ${req.body.name} ${req.body.services==="Infra" ? `on ${req.body.complaintDate}`: ""}`,
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
                        <p>Dear ${req.body.services==="Infra" ? "Maintenance" : (req.body.services==="General" ? "General" : "Service")} Secretary of ${req.body.hostel} Hostel,</p>
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
                        ${req.body.services==="Infra" ? `<strong>Complaint ID:</strong> ${req.body.complaintID}` : "" }
                        ${req.body.services==="Infra" ? `<strong>Complait Date:</strong> ${req.body.complaintDate}`: ""}
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
                        <p>Requesting the Hostel office to please follow up with the ${req.body.services==="Infra" ? "Maintenance" : (req.body.services==="General" ? "General" : "Service")} Secretary and General Secretary to ensure a response to the pending query if it remains unanswered.</p>
                        <p style="margin-top: 40px; text-align: center;">
                            Thanks and Regards,<br>
                            <strong>${req.body.services==="Infra" ? "Aniket Banerjee" : (req.body.services==="General" ? "" : "Himanshu Sharma")}</strong><br>
                            <strong>Joint Secretary, HAB(${req.body.services==="Infra" ? "Infrastructure" : (req.body.services==="General" ? "General" : "Services")})</strong><br>
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
}