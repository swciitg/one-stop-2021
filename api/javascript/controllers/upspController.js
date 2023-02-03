const nodemailer = require("nodemailer");
const fs = require("fs");
const { allIITGGymkhanaBoards, IITGAdminDepts } = require("../helpers/constants");

let mailTransporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.SWC_EMAIL,
        pass: process.env.SWC_EMAIL_PASSWORD
    }
});


exports.submitUpspForm = async (req,res) => {
    console.log(req.body);
    let reciverEmails = [];
    req.body.boards.forEach((element) => reciverEmails.push(allIITGGymkhanaBoards[element]));
    req.body.subcommittees.forEach((element) => reciverEmails.push(IITGAdminDepts[element]));

    let selectedAttachments = [];
    req.body.files.forEach((element,index) => {
        let filepath = __dirname + "/../files_folder/upsp_files/" + element;
        if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
        else console.log("not exists");
    });

console.log(reciverEmails,selectedAttachments);

    let mailDetails = {
        from: process.env.SWC_EMAIL,
        subject: 'UPSP Request',
        to: reciverEmails,
        attachments: selectedAttachments,
        html: `${req.body.problem}<br> <br> Name: ${req.body.name} <br> Roll no.: ${req.body.roll_number}, Email: ${req.body.email} <br> Hostel: ${req.body.hostel}, Ph no. :  ${req.body.phone}<br>`
    }

    mailTransporter.sendMail(mailDetails,(err,res) => {
        console.log(err);
    });
    res.json({"success" : true});
}