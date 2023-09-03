const verifyRoles = require("../utils");
const roles = require("../roles");
const foodOutlets = require("../../models/foodOutlets");

let allowedRoles = [roles.SUPERADMIN, roles.FOODOUTLET];

module.exports = {
    resource: foodOutlets,
    options: {
        listProperties: ["outletName","caption","closingTime","phoneNumber","location","latitude","longitude","tags","menu","imageURL"],
        filterProperties: ["outletName","caption","closingTime","phoneNumber","location","latitude","longitude","tags","menu","imageURL"],
        editProperties: ["outletName","caption","closingTime","phoneNumber","location","latitude","longitude","tags","menu","imageURL"],
        showProperties: ["outletName","caption","closingTime","phoneNumber","location","latitude","longitude","tags","menu","imageURL"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};
