import homePage from "../../models/homePageModel.js";
import roles from "../roles.js";
import verifyRoles from "../utils.js";

const allowedRoles = [roles.SUPERADMIN]; // Only super admin allowed to change homepage image

export default {
    resource: homePage,
    options: {
        listProperties: ["cardsDataList"],
        filterProperties: ["cardsDataList"],
        editProperties: ["cardsDataList", "quickLinks"],
        showProperties: ["cardsDataList", "quickLinks"],
        actions: {
            list: {
                isAccessible: ({currentAdmin}) => verifyRoles(currentAdmin, allowedRoles),
                before: async (request) => {
                    // Remove sort parameters to prevent sorting errors with array fields
                    // Only one entry exists in this collection, so sorting is not needed
                    if (request.query) {
                        delete request.query.sortBy;
                        delete request.query.direction;
                    }
                    return request;
                }
            },
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
