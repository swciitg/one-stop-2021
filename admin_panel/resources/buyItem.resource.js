const verifyRoles = require("../utils");
const roles = require("../roles");
const BuyModel = require("../../models/buyModel");

let allowedRoles = [roles.SUPERADMIN, roles.BUY];

module.exports = {
    resource: BuyModel,
    options: {
        listProperties: ["title", "price","phonenumber","date","description","imageURL","compressedImageURL","email","username"],
        filterProperties: ["title", "price","phonenumber","date","description","imageURL","compressedImageURL","email","username"],
        editProperties: ["title", "price","phonenumber","date","description","imageURL","compressedImageURL","email","username"],
        showProperties: ["title", "price","phonenumber","date","description","imageURL","compressedImageURL","email","username"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => false }, // don't let admin create new buy item
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};