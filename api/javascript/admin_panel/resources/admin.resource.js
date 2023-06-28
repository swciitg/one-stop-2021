const verifyRoles = require("../utils");
const roles = require("../roles");
const adminModel = require("../../models/adminModel");

let allowedRoles = [roles.SUPERADMIN];

module.exports = {
    resource: adminModel,
    options: {
        listProperties: ["email","password","roles"],
        filterProperties: ["email","password","roles"],
        editProperties: ["email","password","roles"],
        showProperties: ["email","password","roles"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        },
    },
};
