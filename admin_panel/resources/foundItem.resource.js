import verifyRoles from "../utils.js";
import roles from "../roles.js";
import foundModel from "../../models/foundModel.js";

const allowedRoles = [roles.SUPERADMIN, roles.FOUND];

export default {
    resource: foundModel,
    options: {
        listProperties: ["title", "date", "location", "submittedat", "description", "photo_id", "imageURL", "compressedImageURL", "email", "username", "claimed", "claimerEmail", "claimerName"],
        filterProperties: ["title", "date", "location", "submittedat", "description", "photo_id", "imageURL", "compressedImageURL", "email", "username", "claimed", "claimerEmail", "claimerName"],
        editProperties: ["title", "date", "location", "submittedat", "description", "photo_id", "imageURL", "compressedImageURL", "email", "username", "claimed", "claimerEmail", "claimerName"],
        showProperties: ["title", "date", "location", "submittedat", "description", "photo_id", "imageURL", "compressedImageURL", "email", "username", "claimed", "claimerEmail", "claimerName"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => false }, // don't let admin create new lost item
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};
