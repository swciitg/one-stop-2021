import verifyRoles from "../utils.js";
import roles from "../roles.js";
import adminModel from "../../models/adminModel.js";

const allowedRoles = [roles.SUPERADMIN];

export default {
    resource: adminModel,
    options: {
        listProperties: ["email", "password", "roles"],
        filterProperties: ["email", "password", "roles"],
        editProperties: ["email", "password", "roles"],
        showProperties: ["email", "password", "roles"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        },
    },
};
