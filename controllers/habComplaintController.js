const nodemailer = require("nodemailer");
const fs = require("fs");
const { IITGHostelWardens, miscellaneousRecievers, IITGHostelGSs } = require("../helpers/constants");

let mailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.UPSP_EMAIL,
        pass: process.env.UPSP_EMAIL_PASSWORD
    }
});

const serviceCCs = ["m.geetanjay@iitg.ac.in", "shubhkarjha533@gmail.com"]    
const infraCCs = ["shubham.jha@iitg.ac.in", "m.geetanjay@iitg.ac.in"]


exports.submitHabComplaint = async (req,res) => {
    console.log(req.body);

    let recieverEmailsForTo = [];
    //let recieverEmailsForCc = ["vp@iitg.ac.in",req.body.email]; // vp recieves every email

    let recieverEmailsForCc = ["shubham.jha@iitg.ac.in",req.body.email];

    
    req.body.hostel.forEach((element) => recieverEmailsForTo.push(IITGHostelWardens[element]))
    req.body.hostel.forEach((element) => recieverEmailsForTo.push(IITGHostelGSs[element]))

    if(req.body.complaint_type === "Service"){
        recieverEmailsForCc.concat(serviceCCs)
    }
    else{
        recieverEmailsForCc.concat(infraCCs)
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
        subject: 'Hab Complaint',
        to: recieverEmailsForTo,
        cc: recieverEmailsForCc,
        attachments: selectedAttachments,
        html: `${req.body.problem}<br> <br> Name: ${req.body.name} <br> Roll no.: ${req.body.roll_number}, Email: ${req.body.email} <br> Hostel: ${req.body.hostel}, Ph no. :  ${req.body.phone}<br> Complaint Regarding: ${req.body.complaint_type}`
    }

    mailTransporter.sendMail(mailDetails,(err,res) => {
        console.log(err);
    });

    res.json({"success" : true});
}