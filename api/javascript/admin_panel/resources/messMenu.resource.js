const messMenu = require("../../models/messMenuModel");
const verifyRoles = require("../utils");
const roles = require("../roles");

let allowedRoles = [roles.SUPERADMIN, roles.MESS];

module.exports = {
    resource: messMenu,
    options: {
        listProperties: ["hostel", "day", "meal", "mealDesription", "timing"],
        filterProperties: ["hostel", "day", "meal", "mealDesription", "timing"],
        editProperties: ["hostel", "day", "meal", "mealDesription", "timing"],
        showProperties: ["hostel", "day", "meal", "mealDesription", "timing"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        },
    },
};
