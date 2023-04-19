const verifyRoles = require("../utils");
const roles = require("../roles");
const busStop = require("../../models/busTiming");

let allowedRoles = [roles.SUPERADMIN, roles.BUSSTOP];

module.exports = {
    resource: busStop,
    options: {
        listProperties: ["busStop", "weekdays_campusToCity", "weekdays_cityToCampus", "weekend_cityToCampus", "weekend_campusToCity"],
        filterProperties: ["busStop", "weekdays_campusToCity", "weekdays_cityToCampus", "weekend_cityToCampus", "weekend_campusToCity"],
        editProperties: ["busStop", "weekdays_campusToCity", "weekdays_cityToCampus", "weekend_cityToCampus", "weekend_campusToCity"],
        showProperties: ["busStop", "weekdays_campusToCity", "weekdays_cityToCampus", "weekend_cityToCampus", "weekend_campusToCity"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
        }
    }
};