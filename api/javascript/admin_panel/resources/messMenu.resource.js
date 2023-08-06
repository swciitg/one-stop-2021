const messMenu = require("../../models/messMenuModel");
const verifyRoles = require("../utils");
const roles = require("../roles");

let allowedRoles = [roles.SUPERADMIN, roles.MESS];

module.exports = {
    resource: messMenu,
    options: {
        listProperties: ["hostel", "monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        filterProperties: ["hostel", "monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        editProperties: ["hostel", "monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        showProperties: ["hostel", "monday","tuesday","wednesday","thursday","friday","saturday","sunday"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};
