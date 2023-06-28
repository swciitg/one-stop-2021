const verifyRoles = require("../utils");
const roles = require("../roles");
const { TravelPostModel } = require("../../models/campusTravelModel");

let allowedRoles = [roles.SUPERADMIN, roles.CABSHARING];

module.exports = {
    resource: TravelPostModel,
    options: {
        listProperties: ["email", "name","travelDateTime","to","from","margin","note","phonenumber","chatId"],
        filterProperties: ["email", "name","travelDateTime","to","from","margin","note","phonenumber","chatId"],
        editProperties: ["email", "name","travelDateTime","to","from","margin","note","phonenumber","chatId"],
        showProperties: ["email", "name","travelDateTime","to","from","margin","note","phonenumber","chatId"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => false }, // don't let admin create travel post
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};
