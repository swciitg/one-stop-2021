const roles = require("../roles");
const homePage = require("../../models/homePage");
const uploadFeature = require('@admin-bro/upload')
import { ComponentLoader } from "adminjs";
const componentLoader = new ComponentLoader()

let allowedRoles = [roles.SUPERADMIN, roles.LOST];

module.exports = {
        resource: homePage,
        features: [uploadFeature({
          componentLoader,
          provider: { local: { bucket: 'images_folder' } },
          properties: {
            key: 'fileUrl',
            mimeType: 'mimeType',
            filename: 'homeimage1234567',
          },
          validation: {
            mimeTypes: 'application/png'
          }
        })],
};
