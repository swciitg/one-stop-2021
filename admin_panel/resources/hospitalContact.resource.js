const hospitalContactModel = require("../../models/hospitalContact");
const roles = require("../roles");
const verifyRoles = require("../utils");

let allowedRoles = [roles.SUPERADMIN, roles.MEDICAL]; 
module.exports = {
    resource: hospitalContactModel,
    options: {
        listProperties: ["name", "miscellaneous_contact", "email", "phone", "category"],
        filterProperties: ["name", "miscellaneous_contact", "email", "phone", "category"],
        editProperties:["name", "miscellaneous_contact", "email", "phone", "category"],
        showProperties: ["name", "miscellaneous_contact", "email", "phone", "category"],
        actions: {
            list: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},  
            new: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},  
            filter: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            edit: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)}, 
            delete: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)}
        },
    }
};