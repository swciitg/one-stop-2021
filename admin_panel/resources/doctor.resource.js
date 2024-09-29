const doctorModel = require("../../models/doctorModel");
const roles = require("../roles");
const verifyRoles = require("../utils");

let allowedRoles = [roles.SUPERADMIN]; // Only super admin allowed to change homepage image

module.exports = {
    resource: doctorModel,
    options: {
        listProperties: ["name", "degree", "designation"],
        filterProperties: ["name", "degree", "designation"],
        editProperties:["name", "degree", "designation"],
        showProperties: ["name", "degree", "designation"],
        actions: {
            list: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            new: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            filter: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            edit: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            delete: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)}
        },
    }
};