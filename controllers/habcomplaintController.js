const nodemailer = require("nodemailer");
const fs = require("fs");
const { allIITGGymkhanaBoards, IITGAdminDepts, miscellaneousRecievers } = require("../helpers/constants");

let mailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.UPSP_EMAIL,
        pass: process.env.UPSP_EMAIL_PASSWORD
    }
});


exports.submitHabComplaint = async (req,res) => {
    console.log(req.body);
    let recieverEmailsForTo = ["vineet.mech22@iitg.ac.in"];
    let recieverEmailsForCc = ["vineet.mech22@iitg.ac.in",req.body.email];

    let selectedAttachments = [];
    req.body.files.forEach((element,index) => {
        let filepath = __dirname + "/../files_folder/hab_complaints_files/" + element;
        if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
        else console.log("not exists");
    });




    let mailDetails = {
        from: process.env.UPSP_EMAIL,
        subject: 'HAB Complaint Confirmation',
        to: recieverEmailsForTo,
        cc: recieverEmailsForCc,
        attachments: selectedAttachments,
        html: ` Your complaint is successfully registered:
        Complaint Details:
         <br>Feedback:${req.body.feedback} <br> Name: ${req.body.name} <br>Complaint Regarding:${req.body.service}<br> Hostel: ${req.body.hostel}<br>Room Number:${req.body.room_number}<br> Email: ${req.body.email} <br>  Ph no. :  ${req.body.phone}<br>`
    }

    mailTransporter.sendMail(mailDetails,(err,res) => {
        console.log(err);
    });

    res.json({"success" : true});
}