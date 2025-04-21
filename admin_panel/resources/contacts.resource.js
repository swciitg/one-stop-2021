import verifyRoles from "../utils.js";
import roles from "../roles.js";
import contactSection from "../../models/contactSection.js";
import importExportFeature from '@adminjs/import-export';
import {componentLoader} from '../ui/loader.js';

const allowedRoles = [roles.SUPERADMIN, roles.CONTACTS];

export default {
    resource: contactSection,
    features: [
        importExportFeature({componentLoader}),
    ],
    options: {
        listProperties: ["sectionName", "contacts"],
        filterProperties: ["sectionName", "contacts"],
        editProperties: ["sectionName", "contacts"],
        showProperties: ["sectionName", "contacts"],
        actions: {
            list: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            new: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            filter: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            edit: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) },
            delete: { isAccessible: ({ currentAdmin }) => verifyRoles(currentAdmin, allowedRoles) }
        }
    }
};
