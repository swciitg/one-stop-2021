import doctorModel from "../../models/doctorModel.js";
import roles from "../roles.js";
import verifyRoles from "../utils.js";

const allowedRoles = [roles.SUPERADMIN, roles.MEDICAL];

export default {
    resource: doctorModel,
    options: {
        listProperties: ["name", "degree", "designation"],
        filterProperties: ["name", "degree", "designation"],
        editProperties: ["name", "degree", "designation"],
        showProperties: ["name", "degree", "designation"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        },
    }
};