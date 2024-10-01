const hospitalContactModel = require("../../models/hospitalContact");
const roles = require("../roles");
const verifyRoles = require("../utils");

let allowedRoles = [roles.SUPERADMIN]; // Only super admin allowed to change homepage image

module.exports = {
    resource: hospitalContactModel,
    options: {
        listProperties: ["name", "degree", "designation", "email", "phone", "degree"],
        filterProperties: ["name", "degree", "designation", "email", "phone", "degree"],
        editProperties:["name", "degree", "designation", "email", "phone", "degree"],
        showProperties: ["name", "degree", "designation", "email", "phone", "degree"],
        actions: {
            list: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            new: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            filter: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            edit: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            delete: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)}
        },
    }
};