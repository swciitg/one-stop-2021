const nodemailer = require('nodemailer');

const send_email = (req, res) => {
    const output = `<p>${req.body.emailbody}</p>`;

    // create reusable transporter object using the default SMTP transport
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'raginiswc21@gmail.com', // generated ethereal user
            pass: '@Ragini21'  // generated ethereal password
        },
    });

    // setup email data with unicode symbols
    let mailOptions = {
        from: '"Nodemailer Contact" raginiswc21@gmail.com', // sender address
        to: `${req.body.receiver_emailid}`, // list of receivers
        subject: `${req.body.subject}`, // Subject line
        text: 'Hello world?', // plain text body
        html: output // html body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));

        res.render('emailing_service');
        Response.Write("<script>alert('Email sent Successfully')</script>");
    });
};

module.exports = { send_email };