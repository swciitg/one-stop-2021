const user = require("../../models/onestopUserModel");
const verifyRoles = require("../utils");
const roles = require("../roles");

let allowedRoles = [roles.SUPERADMIN];

module.exports = {
    resource: user,
    options: {
        listProperties: ["name", "email", "deviceTokens", "roles"],
        filterProperties: ["name", "email", "deviceTokens", "roles"],
        editProperties: ["name", "email", "password", "deviceTokens", "roles"],
        showProperties: ["name", "email", "deviceTokens", "roles"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        },
    },
};
