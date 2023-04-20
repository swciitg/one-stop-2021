const verifyRoles = require("../utils");
const roles = require("../roles");
const transportTiming = require("../../models/transportTimings");

let allowedRoles = [roles.SUPERADMIN, roles.FERRYTIMING];

module.exports = {
    resource: transportTiming,
    options: {
        filterProperties: ["type","stop"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        }
    }
};