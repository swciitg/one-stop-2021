import nodemailer from "nodemailer";
import fs from "fs";
import { allIITGGymkhanaBoards, IITGAdminDepts, miscellaneousRecievers } from "../helpers/constants.js";

const mailTransporter = nodemailer.createTransport({
    host: "smtp-mail.outlook.com",
    auth: {
        user: process.env.UPSP_EMAIL,
        pass: process.env.UPSP_EMAIL_PASSWORD
    }
});

export const submitUpspForm = async (req, res) => {
    console.log(req.body);
    let recieverEmailsForTo = [];
    let recieverEmailsForCc = ["vp@iitg.ac.in", req.body.email]; // vp receives every email
    req.body.boards.forEach((element) => {
        if (element !== 'Miscellaneous') recieverEmailsForTo.push(allIITGGymkhanaBoards[element]);
        else recieverEmailsForTo = recieverEmailsForTo.concat(miscellaneousRecievers);
    });
    req.body.subcommittees.forEach((element) => recieverEmailsForTo.push(IITGAdminDepts[element]));

    let selectedAttachments = [];
    req.body.files.forEach((element, index) => {
        let filepath = new URL(`../files_folder/upsp_files/${element}`, import.meta.url).pathname;
        if (fs.existsSync(filepath)) selectedAttachments.push({ path: filepath });
        else console.log("not exists");
    });

    recieverEmailsForTo = [...new Set(recieverEmailsForTo)]; // removing redundant items from array
    recieverEmailsForCc = [...new Set(recieverEmailsForCc)];

    console.log(recieverEmailsForTo, recieverEmailsForCc, selectedAttachments);

    let mailDetails = {
        from: process.env.UPSP_EMAIL,
        subject: 'UPSP Request',
        to: recieverEmailsForTo,
        cc: recieverEmailsForCc,
        attachments: selectedAttachments,
        html: `<!DOCTYPE html>
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
                        <h3>Problem</h3>
                        <p>${req.body.problem}</p>
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
                    <td style="padding: 20px;">
                        <p><strong>Note:</strong> PFA relevant complaint proofs (if uploaded by ${req.body.name}).</p>
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
        </html>`
    };

    mailTransporter.sendMail(mailDetails, (err, res) => {
        console.log(err);
    });

    res.json({ "success": true });
};
