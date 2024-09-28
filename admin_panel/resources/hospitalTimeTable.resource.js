const hospitalTimeTableModel = require("../../models/hospitalTimeTableModel");
const roles = require("../roles");
const verifyRoles = require("../utils");

let allowedRoles = [roles.SUPERADMIN]; // Only super admin allowed to change homepage image

module.exports = {
    resource: hospitalTimeTableModel,
    // options: {
    //     listProperties: ["doctor", "degree", "designation", "category", "slots"],
    //     filterProperties: ["doctor", "degree", "designation", "category", "slots"],
    //     editProperties:["doctor", "degree", "designation", "category", "slots"],
    //     showProperties: ["doctor", "degree", "designation", "category", "slots"],
    //     actions: {
    //         list: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
    //         new: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
    //         filter: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
    //         edit: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
    //         delete: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)}
    //     },
    // }
};