const hospitalTimeTableModel = require("../../models/hospitalTimeTableModel");
const nodemailer = require("nodemailer");
const roles = require("../roles");
const verifyRoles = require("../utils");

let allowedRoles = [roles.SUPERADMIN, roles.MEDICAL]; 

module.exports = {
    resource: hospitalTimeTableModel,
    options: {
        listProperties: ["doctor", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],  //can add slots from slotschema
        filterProperties: ["doctor", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],
        editProperties:["doctor", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],
        showProperties: ["doctor", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],
        actions: {
            list: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            new: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            filter: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            edit: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            delete: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            new : {
                before : async (request) => {
                    if(request.payload.date){
                        const utcDate = new Date(request.payload.date);
                        const localDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000)); // Added milliseconds equivalent to 5.5 hours ahead of UTC to convert to IST
                        const options = {
                            timeZone: 'Asia/Kolkata',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        };
                        const locaLDateString = utcDate.toLocaleString("en-GB", options)
                        request.payload.date = new Date(localDate);
                        request.payload.visibleDate = locaLDateString;
                    }
                    return request;
                }
            },
            edit : {
                before : async (request) => {
                    if(request.payload.date){
                        const utcDate = new Date(request.payload.date);
                        const localDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
                        const options = {
                            timeZone: 'Asia/Kolkata',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        };
                        const locaLDateString = utcDate.toLocaleString("en-GB", options)
                        request.payload.date = new Date(localDate);
                        request.payload.visibleDate = locaLDateString;
                    }
                    return request;
                } 
            },
            // doctorUnavailable : {
            //     actionType : 'record',
            //     component : false,
            //     handler : async (req, res, context) => {
            //         const { record, currentAdmin } = context;
            //         // console.log(records);
            //         try {
            //             const recordId = record.id();
            //             const timetableRecord = await hospitalTimeTableModel.findById(recordId).populate('doctor');
            //             const {doctor, date } = timetableRecord;
            //             console.log(date);

            //             const utcDate = date;
            //             const options = {
            //                 timeZone: 'Asia/Kolkata', 
            //                 year: 'numeric',
            //                 month: '2-digit',
            //                 day: '2-digit',
            //                 weekday :'long'
            //             }

            //             const localDate = utcDate.toLocaleString('en-GB', options);

            //             const deletedRecord = await hospitalTimeTableModel.findByIdAndDelete(recordId);
            //             if (!deletedRecord) {
            //                 throw new Error('Record not found');
            //             }

            //             let mailTransporter = nodemailer.createTransport({
            //                 host: "smtp-mail.outlook.com",
            //                 auth: {
            //                     user: process.env.UPSP_EMAIL,
            //                     pass: process.env.UPSP_EMAIL_PASSWORD
            //                 }
            //             });
                        
            //             const mailDetails = {
            //                 from: process.env.UPSP_EMAIL,
            //                 to: ["m.raza@iitg.ac.in"], // Email recipients
            //                 subject: `${doctor.name}, ${doctor.degree}, ${doctor.designation} on leave-reg.`,
            //                 html: `
            //                   <div>
            //                     <p>This is for information to all that ${doctor.name}, ${doctor.designation} will not be available on ${localDate} at IIT Guwahati Hospital for consultation.</p>
            //                     <p>With regards,</p>
            //                   </div>
            //                 `
            //               };
                          
            //               mailTransporter.sendMail(mailDetails, (error, info) => {
            //                 if (error) {
            //                   console.error('Error sending email:', error);
            //                 } else {
            //                   console.log('Email sent:', info.response);
            //                 }
            //               });

            //               return {
            //                 record: record.toJSON(currentAdmin),
            //                 notice: {
            //                     message: 'Record deleted and email sent successfully!',
            //                     type: 'success',
            //                 },
            //             };
            //         } catch (error) {
            //             console.error('Error deleting record or sending email:', error);
            //             console.log(error.message);
            //         }

            //     }
            // },
        },
    }
};