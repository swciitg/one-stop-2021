import hospitalTimeTableModel from "../../models/hospitalTimeTableModel.js";
import nodemailer from "nodemailer";
import roles from "../roles.js";
import verifyRoles from "../utils.js";

const allowedRoles = [roles.SUPERADMIN, roles.MEDICAL];

export default {
    resource: hospitalTimeTableModel,
    options: {
        listProperties: ["doctor", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],  //can add slots from slotschema
        filterProperties: ["doctor", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],
        editProperties: ["doctor", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],
        showProperties: ["doctor", "category", "date", "startTime1", "endTime1", "startTime2", "endTime2"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: {
                before: async (request) => {
                    if (request.payload.date) {
                        const utcDate = new Date(request.payload.date);
                        const localDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000)); // Added milliseconds equivalent to 5.5 hours ahead of UTC to convert to IST
                        const options = {
                            timeZone: 'Asia/Kolkata',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        };
                        const locaLDateString = utcDate.toLocaleString("en-GB", options);
                        request.payload.date = new Date(localDate);
                        request.payload.visibleDate = locaLDateString;
                    }
                    return request;
                }
            },
            edit: {
                before: async (request) => {
                    if (request.payload.date) {
                        const utcDate = new Date(request.payload.date);
                        const localDate = new Date(utcDate.getTime() + (5.5 * 60 * 60 * 1000));
                        const options = {
                            timeZone: 'Asia/Kolkata',
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                        };
                        const locaLDateString = utcDate.toLocaleString("en-GB", options);
                        request.payload.date = new Date(localDate);
                        request.payload.visibleDate = locaLDateString;
                    }
                    return request;
                }
            },
        },
    }
};
