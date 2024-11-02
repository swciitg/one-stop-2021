const verifyRoles = require("../utils");
const roles = require("../roles");
const { HabAdmin } = require("../../models/habModels/habAdminModel");

let allowedRoles = [roles.SUPERADMIN, roles.MESS];

module.exports = {
    resource: HabAdmin,
    options: {
        listProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate", 
            "smcEmails"
        ],
        filterProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate", 
            "smcEmails"
        ],
        editProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate",
            "smcEmails"
        ],
        showProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate",
            "smcEmails"
        ],
        actions: {
            list: { 
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) 
            },
            new: { 
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) 
            },
            filter: { 
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) 
            },
            edit: { 
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) 
            },
            delete: { 
                isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) 
            }
        }
    }
};
