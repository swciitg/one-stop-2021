import verifyRoles from "../utils.js";
import roles from "../roles.js";
import announcementModel from "../../models/announcementModel.js";

const allowedRoles = [roles.SUPERADMIN, roles.ANNOUNCEMENT];

export default {
    resource: announcementModel,
    options: {
        listProperties: ["title", "body"],
        filterProperties: ["title", "body"],
        showProperties: ["title", "body"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => false }, // never edit an announcement
            delete: { isAccessible: ({ currentAdmin }) => false } // never delete an announcement
        },
    },
};