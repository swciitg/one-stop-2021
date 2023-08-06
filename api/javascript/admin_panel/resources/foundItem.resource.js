const verifyRoles = require("../utils");
const roles = require("../roles");
const foundModel = require("../../models/foundModel");

let allowedRoles = [roles.SUPERADMIN, roles.FOUND];

module.exports = {
    resource: foundModel,
    options: {
        listProperties: ["title", "date","location","submittedat","description","photo_id","imageURL","compressedImageURL","email","username","claimed","claimerEmail","claimerName"],
        filterProperties: ["title", "date","location","submittedat","description","photo_id","imageURL","compressedImageURL","email","username","claimed","claimerEmail","claimerName"],
        editProperties: ["title", "date","location","submittedat","description","photo_id","imageURL","compressedImageURL","email","username","claimed","claimerEmail","claimerName"],
        showProperties: ["title", "date","location","submittedat","description","photo_id","imageURL","compressedImageURL","email","username","claimed","claimerEmail","claimerName"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => false }, // don't let admin create new lost item
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};
