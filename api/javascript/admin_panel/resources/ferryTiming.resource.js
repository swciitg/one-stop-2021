const verifyRoles = require("../utils");
const roles = require("../roles");
const ferryTiming = require("../../models/ferryTiming");

let allowedRoles = [roles.SUPERADMIN, roles.FERRYTIMING];

module.exports = {
    resource: ferryTiming,
    options: {
        listProperties: ["ferryGhat", "weekdays_campusToCity", "weekdays_cityToCampus", "weekend_cityToCampus", "weekend_campusToCity"],
        filterProperties: ["ferryGhat", "weekdays_campusToCity", "weekdays_cityToCampus", "weekend_cityToCampus", "weekend_campusToCity"],
        editProperties: ["ferryGhat", "weekdays_campusToCity", "weekdays_cityToCampus", "weekend_cityToCampus", "weekend_campusToCity"],
        showProperties: ["ferryGhat", "weekdays_campusToCity", "weekdays_cityToCampus", "weekend_cityToCampus", "weekend_campusToCity"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        },
    },
};