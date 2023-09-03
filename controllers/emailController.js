const nodemailer = require('nodemailer');

/**
 * @swagger
 * /api/v0/send:
 *   post:
 *     tags:
 *     - email
 *     description: send email
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             receiver_emailid:
 *               type: string
 *             subject :
 *               type: string
 *             emailbody:
 *               type: string
 *     responses:
 *       201:
 *         description: Email sent
 *       400:
 *         description: Error message(s)
 */

const sendEmail = (req, res) => {
  const output = `<p>${req.body.emailbody}</p>`;

  // create reusable transporter object using the default SMTP transport
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'raginiswc21@gmail.com', // generated ethereal user
      pass: '@Ragini21', // generated ethereal password
    },

  });

  // setup email data with unicode symbols
  const mailOptions = {
    from: '"Nodemailer Contact" raginiswc21@gmail.com', // sender address
    to: `${req.body.receiver_emailid}`, // list of receivers
    subject: `${req.body.subject}`, // Subject line
    text: 'Hello world?', // plain text body
    html: output, // html body
  };

  // send mail with defined transport object
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message sent: %s', info.messageId);
    // console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
  });
};

module.exports = { sendEmail };
