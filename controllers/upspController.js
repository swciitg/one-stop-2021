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


exports.submitUpspForm = async (req,res) => {
    console.log(req.body);
    let recieverEmailsForTo = [];
    // let recieverEmailsForCc = ["vp@iitg.ac.in",req.body.email]; // vp recieves every email
    req.body.boards.forEach((element) => {
        if(element!=='Miscellaneous') recieverEmailsForTo.push(allIITGGymkhanaBoards[element]);
        else recieverEmailsForTo = recieverEmailsForTo.concat(miscellaneousRecievers);
    });
    req.body.subcommittees.forEach((element) => recieverEmailsForTo.push(IITGAdminDepts[element]));

    let selectedAttachments = [];
    req.body.files.forEach((element,index) => {
        let filepath = __dirname + "/../files_folder/upsp_files/" + element;
        if(fs.existsSync(filepath)) selectedAttachments.push({path : filepath});
        else console.log("not exists");
    });

    recieverEmailsForTo = [...new Set(recieverEmailsForTo)]; // removing redundant items from array
    // recieverEmailsForCc = [...new Set(recieverEmailsForCc)];

    // console.log(recieverEmailsForTo,recieverEmailsForCc,selectedAttachments);

    let mailDetails = {
        from: process.env.UPSP_EMAIL,
        subject: 'UPSP Request',
        to: recieverEmailsForTo,
        // cc: recieverEmailsForCc,
        attachments: selectedAttachments,
        html: `${req.body.problem}<br> <br> Name: ${req.body.name} <br> Roll no.: ${req.body.roll_number}, Email: ${req.body.email} <br> Hostel: ${req.body.hostel}, Ph no. :  ${req.body.phone}<br>`
    }

    mailTransporter.sendMail(mailDetails,(err,res) => {
        console.log(err);
    });

    res.json({"success" : true});
}