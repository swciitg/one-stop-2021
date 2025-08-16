import verifyRoles from "../utils.js";
import roles from "../roles.js";
import BuyModel from "../../models/buyModel.js";

const allowedRoles = [roles.SUPERADMIN, roles.BUY];

export default {
    resource: BuyModel,
    options: {
        listProperties: ["title", "price", "phonenumber", "date", "description", "imageURL", "compressedImageURL", "email", "username"],
        filterProperties: ["title", "price", "phonenumber", "date", "description", "imageURL", "compressedImageURL", "email", "username"],
        editProperties: ["title", "price", "phonenumber", "date", "description", "imageURL", "compressedImageURL", "email", "username"],
        showProperties: ["title", "price", "phonenumber", "date", "description", "imageURL", "compressedImageURL", "email", "username"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => false }, // don't let admin create new buy item
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};