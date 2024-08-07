const homePage = require("../../models/homePageModel");
const roles = require("../roles");
const verifyRoles = require("../utils");

let allowedRoles = [roles.SUPERADMIN]; // Only super admin allowed to change homepage image

module.exports = {
    resource: homePage,
    options: {
        listProperties: ["cardsDataList"],
        filterProperties: ["cardsDataList"],
        editProperties: ["cardsDataList", "quickLinks"],
        showProperties: ["cardsDataList", "quickLinks"],
        actions: {
            list: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            new: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            filter: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            edit: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)},
            delete: {isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles)}
        },
        properties: {
            quickLinks: {
                description: "In Icon number add the number of the icon from https://fonts.google.com/icons - then convert code point to Decimal",
            },
            path: {
                description: "Dont change this field, it is used to store the path of the image uploaded for the home page. To change the image, upload a new image and then delete the old one. If the path wont exist it will show the map image.",
            },
        }
    }
};
