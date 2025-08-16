import verifyRoles from "../utils.js";
import roles from "../roles.js";
import { HabAdmin } from "../../models/habModels/habAdminModel.js";
import { allIITGMess } from "../../helpers/constants.js";

const allowedRoles = [roles.SUPERADMIN, roles.MESS];

const smcEmailProperties = allIITGMess.map((hostel) => `smcEmails.${hostel}`);

export default {
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
