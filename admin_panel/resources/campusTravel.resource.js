import verifyRoles from "../utils.js";
import roles from "../roles.js";
import { TravelPostModel } from "../../models/campusTravelModel.js";

const allowedRoles = [roles.SUPERADMIN, roles.CABSHARING];

export default {
    resource: TravelPostModel,
    options: {
        listProperties: ["email", "name", "travelDateTime", "to", "from", "margin", "note", "phonenumber", "chatId"],
        filterProperties: ["email", "name", "travelDateTime", "to", "from", "margin", "note", "phonenumber", "chatId"],
        editProperties: ["email", "name", "travelDateTime", "to", "from", "margin", "note", "phonenumber", "chatId"],
        showProperties: ["email", "name", "travelDateTime", "to", "from", "margin", "note", "phonenumber", "chatId"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => false }, // don't let admin create travel post
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};
