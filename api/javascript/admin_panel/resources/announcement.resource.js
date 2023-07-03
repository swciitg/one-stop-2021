const verifyRoles = require("../utils");
const roles = require("../roles");
const announcementModel = require("../../models/announcementModel");

let allowedRoles = [roles.SUPERADMIN,roles.ANNOUNCEMENT];

module.exports = {
    resource: announcementModel,
    options: {
        listProperties: ["title","body"],
        filterProperties: ["title","body"],
        showProperties: ["title","body"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => false }, // never edit an announcement
            delete: { isAccessible: ({ currentAdmin }) => false } // never delete an announcement
        },
    },
};