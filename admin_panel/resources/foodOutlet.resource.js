import verifyRoles from "../utils.js";
import roles from "../roles.js";
import foodOutlets from "../../models/foodOutlets.js";

const allowedRoles = [roles.SUPERADMIN, roles.FOODOUTLET];

export default {
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
