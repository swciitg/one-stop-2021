const homePage = require("../../models/homePageModel");
const roles = require("../roles");
const verifyRoles = require("../utils");

let allowedRoles = [roles.SUPERADMIN];

module.exports = {
  resource: homePage,
  options: {
    listProperties: ["url", "ratio"],
    filterProperties: ["url", "ratio"],
    editProperties: ["ratio", "quickLinks"],
    showProperties: ["path", "ratio", "quickLinks"],
    actions: {
        list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        new: { isAccessible: ({ currentAdmin }) => false }, // don't let admin create new lost item
        filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
    }
  }
};