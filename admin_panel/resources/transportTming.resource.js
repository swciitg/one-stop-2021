import verifyRoles from "../utils.js";
import roles from "../roles.js";
import transportTiming from "../../models/transportTimings.js";

const allowedRoles = [roles.SUPERADMIN, roles.TRANSPORTTIMING];

export default {
    resource: transportTiming,
    options: {
        filterProperties: ["type", "stop"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        }
    }
};