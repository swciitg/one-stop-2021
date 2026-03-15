import verifyRoles from "../utils.js";
import roles from "../roles.js";
import TravelGuide from "../../models/travelGuideModel.js";

const allowedRoles = [roles.SUPERADMIN, roles.TRANSPORTTIMING];

export default {
    resource: TravelGuide,
    options: {
        listProperties: ["place", "iconType", "description", "transportMethods"],
        filterProperties: ["place", "iconType"],
        editProperties: ["place", "iconType", "description", "transportMethods"],
        showProperties: ["place", "iconType", "description", "transportMethods"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        },
    },
};
