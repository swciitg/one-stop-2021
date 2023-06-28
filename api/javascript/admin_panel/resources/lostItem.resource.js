const verifyRoles = require("../utils");
const roles = require("../roles");
const LostModel = require("../../models/LostModel");

let allowedRoles = [roles.SUPERADMIN, roles.LOST];

module.exports = {
    resource: LostModel,
    options: {
        listProperties: ["title", "date","location","phonenumber","description","photo_id","imageURL","compressedImageURL","email","username"],
        filterProperties: ["title", "date","location","phonenumber","description","photo_id","imageURL","compressedImageURL","email","username"],
        editProperties: ["title", "date","location","phonenumber","description","photo_id","imageURL","compressedImageURL","email","username"],
        showProperties: ["title", "date","location","phonenumber","description","photo_id","imageURL","compressedImageURL","email","username"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => false }, // don't let admin create new lost item
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};
