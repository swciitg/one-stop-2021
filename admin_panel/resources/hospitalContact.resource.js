import hospitalContactModel from "../../models/hospitalContact.js";
import roles from "../roles.js";
import verifyRoles from "../utils.js";

const allowedRoles = [roles.SUPERADMIN, roles.MEDICAL];

export default {
    resource: hospitalContactModel,
    options: {
        listProperties: ["name", "miscellaneous_contact", "email", "phone", "category"],
        filterProperties: ["name", "miscellaneous_contact", "email", "phone", "category"],
        editProperties: ["name", "miscellaneous_contact", "email", "phone", "category"],
        showProperties: ["name", "miscellaneous_contact", "email", "phone", "category"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        },
    }
};