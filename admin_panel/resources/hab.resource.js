const verifyRoles = require("../utils");
const roles = require("../roles");
const { HabAdmin } = require("../../models/habModels/habAdminModel");
const { allIITGMess } = require("../../helpers/constants");

let allowedRoles = [roles.SUPERADMIN, roles.MESS];

const smcEmailProperties = allIITGMess.map((hostel) => `smcEmails.${hostel}`);

module.exports = {
    resource: HabAdmin,
    options: {
        listProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate",
            ...smcEmailProperties
        ],
        filterProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate",
            ...smcEmailProperties
        ],
        editProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate",
            ...smcEmailProperties
        ],
        showProperties: [
            "opiResponseRecipients", 
            "opiStartDate", 
            "opiEndDate", 
            "messChangeStartDate", 
            "messChangeEndDate",
            ...smcEmailProperties
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
