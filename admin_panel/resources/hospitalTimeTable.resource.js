const hospitalTimeTableModel = require("../../models/hospitalTimeTableModel");
const nodemailer = require("nodemailer");
const roles = require("../roles");
const verifyRoles = require("../utils");

let allowedRoles = [roles.SUPERADMIN]; 

module.exports = {
    resource: hospitalTimeTableModel,
    options: {
        listProperties: ["doctor", "degree", "designation", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],
        filterProperties: ["doctor", "degree", "designation", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],
        editProperties:["doctor", "degree", "designation", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],
        showProperties: ["doctor", "degree", "designation", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],
        actions: {
            list: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            new: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            filter: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            edit: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            delete: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            doctorUnavailable : {
                actionType : 'record',
                component : false,
                handler : async (req, res, context) => {
                    const { record, currentAdmin } = context;
                    // console.log(records);
                    try {
                        const recordInJSON = record.toJSON(currentAdmin);
                        const recordId = record.id();
                        const timetableRecord = await hospitalTimeTableModel.findById(recordId).populate('doctor');
                        const {doctor, degree, designation, date } = timetableRecord;
                        const deletedRecord = await hospitalTimeTableModel.findByIdAndDelete(recordId);
                        if (!deletedRecord) {
                            throw new Error('Record not found');
                        }

                        let mailTransporter = nodemailer.createTransport({
                            host: "smtp-mail.outlook.com",
                            auth: {
                                user: process.env.UPSP_EMAIL,
                                pass: process.env.UPSP_EMAIL_PASSWORD
                            }
                        });
                        
                        const mailDetails = {
                            from: process.env.UPSP_EMAIL,
                            to: ["itsaamirrazaofficial@gmail.com", "mangal@iitg.ac.in"], // Email recipients
                            subject: `${doctor.name}, ${degree}, ${designation} will be Unavailable.`,
                            html: `
                              <div>
                                <p>This is for information to all that ${doctor.name}, ${designation} will not be available on ${date} in IIT Guwahati.</p>
                              </div>
                            `
                          };
                          
                          mailTransporter.sendMail(mailDetails, (error, info) => {
                            if (error) {
                              console.error('Error sending email:', error);
                            } else {
                              console.log('Email sent:', info.response);
                            }
                          });

                          return {
                            record: record.toJSON(currentAdmin),
                            notice: {
                                message: 'Record deleted and email sent successfully!',
                                type: 'success',
                            },
                        };
                    } catch (error) {
                        console.error('Error deleting record or sending email:', error);
                        console.log(error.message);
                    }

                }
            },
        },
    }
};