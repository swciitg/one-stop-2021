const verifyRoles = require("../utils");
const roles = require("../roles");
const contactSection = require("../../models/contactSection");

let allowedRoles = [roles.SUPERADMIN, roles.CONTACTS];

module.exports = {
    resource: contactSection,
    options: {
        listProperties: ["sectionName","contacts"],
        filterProperties: ["sectionName","contacts"],
        editProperties: ["sectionName","contacts"],
        showProperties: ["sectionName","contacts"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};
