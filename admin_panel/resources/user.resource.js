import user from "../../models/userModel.js";
import verifyRoles from "../utils.js";
import roles from "../roles.js";

const allowedRoles = [roles.SUPERADMIN, roles.ONESTOPUSER];

export default {
    resource: user,
    options: {
        listProperties: ["name", "outlookEmail", "altEmail", "rollNo", "dob", "gender", "hostel", "roomNo", "blocked", "notifPref", "homeAddress", "phoneNumber", "emergencyPhoneNumber", "linkedin", "subscribedMess"],
        filterProperties: ["name", "outlookEmail", "altEmail", "rollNo", "dob", "gender", "hostel", "roomNo", "blocked", "notifPref", "homeAddress", "phoneNumber", "emergencyPhoneNumber", "linkedin", "subscribedMess"],
        editProperties: ["name", "outlookEmail", "altEmail", "rollNo", "dob", "gender", "hostel", "roomNo", "blocked", "notifPref", "homeAddress", "phoneNumber", "emergencyPhoneNumber", "linkedin", "subscribedMess"],
        showProperties: ["name", "outlookEmail", "altEmail", "rollNo", "dob", "gender", "hostel", "roomNo", "blocked", "notifPref", "homeAddress", "phoneNumber", "emergencyPhoneNumber", "linkedin", "subscribedMess"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        },
    },
};
