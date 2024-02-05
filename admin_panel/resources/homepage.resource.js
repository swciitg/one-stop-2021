const homePage = require("../../models/homePageModel");
const roles = require("../roles");

let allowedRoles = [roles.SUPERADMIN];

module.exports = {
  resource: homePage,
  options: {
    listProperties: ["url", "ratio"],
    filterProperties: ["url", "ratio"],
    editProperties: ["url", "ratio", "quickLinks"],
    showProperties: ["url", "ratio", "quickLinks"],
    actions: {
        list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        new: { isAccessible: ({ currentAdmin }) => false }, // don't let admin create new lost item
        filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
    }
  }
};