const nodemailer = require("nodemailer");
const fs = require("fs");
const { IITGHostelWardens, miscellaneousRecievers, IITGHostelGSs, IITGHostelSSs, IITGHostelOffices } = require("../helpers/constants");

let mailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.UPSP_EMAIL,
        pass: process.env.UPSP_EMAIL_PASSWORD
    }
});

// const serviceCCs = ["hostelservices_complaints@iitg.ac.in"]    
const serviceCCs = ["m.geetanjay@iitg.ac.in", "shubhkarjha533@gmail.com"]  
// const infraCCs = [""]   
const infraCCs = ["shubhkarjha533@gmail.com", "m.geetanjay@iitg.ac.in"]


exports.submitHabComplaint = async (req,res) => {
    console.log(req.body);

    let recieverEmailsForTo = [req.body.email];
    
    let recieverEmailsForCc = ["shubham.jha@iitg.ac.in"];
    //let recieverEmailsForCc = ["vp@iitg.ac.in",req.body.email]; // vp recieves every email

    // req.body.hostel.forEach((element) => recieverEmailsForCc.push(IITGHostelGSs[element]))
    // req.body.hostel.forEach((element) => recieverEmailsForCc.push(IITGHostelWardens[element]))
    // req.body.hostel.forEach((element) => recieverEmailsForCc.push(IITGHostelOffices[element]))


    if(req.body.complaint_type !== "Infra"){
        // req.body.hostel.forEach((element) => recieverEmailsForTo.push(IITGHostelSSs[element]))
        recieverEmailsForCc = recieverEmailsForCc.concat(serviceCCs)
    }
    else{
        recieverEmailsForCc = recieverEmailsForCc.concat(infraCCs)
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
        //Need to setup a new HAB_EMAIL in .env file
        from: process.env.UPSP_EMAIL,
        //right now working on UPSP_EMAIL
        subject: `${req.body.complaint_type} Feedback/Complaint from ${req.body.hostel} hostel by ${req.body.name}`,
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
                        <p>Dear Service Secretary of ${req.body.hostel} Hostel,</p>
                        <p>This is an auto-generated email based on the response submitted by <strong>${req.body.name}</strong>.</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                        <h3>Complaint/Feedback Received for:</h3>
                        <p>${req.body.complaint_type}</p>
                    </td>
                </tr>
                <tr>
                    <td style="padding: 20px; border-bottom: 1px solid #dddddd;">
                        <h3>Complainant Information or Feedback Provider</h3>
                        <p><strong>Name:</strong> ${req.body.name} (${req.body.email})<br>
                        <strong>Roll No.</strong>  ${req.body.roll_number}<br>
                        <strong>Hostel:</strong> ${req.body.hostel}<br>
                        <strong>Phone No.:</strong> ${req.body.phone}</p>
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
                        <p>Requesting the Hostel office to please follow up with the Service Secretary and General Secretary to ensure a response to the pending query if it remains unanswered.</p>
                        <p style="margin-top: 40px; text-align: center;">
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
}