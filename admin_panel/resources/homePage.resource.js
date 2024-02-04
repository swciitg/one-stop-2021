const verifyRoles = require("../utils");
const roles = require("../roles");
const homePage = require("../../models/homePage");
const AdminBro = require('admin-bro')
const AdminBroExpress = require('@admin-bro/express')
const uploadFeature = require('@admin-bro/upload')

let allowedRoles = [roles.SUPERADMIN, roles.LOST];

module.exports = {
    resources: [{
        resource: homePage,
        features: [uploadFeature({
          provider: { local: { bucket: 'images_folder/homePage' } },
          properties: {
            key: 'fileUrl',
            mimeType: 'mimeType',
            filename: 'homeimage',
          },
          validation: {
            mimeTypes: 'application/png'
          }
        })],
        
    }]
};
