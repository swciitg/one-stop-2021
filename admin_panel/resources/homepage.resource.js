const uploadFeature = require('@adminjs/upload');
const homePage = require("../../models/homePageModel");
const componentLoader = require("../ui/loader");

const localProvider = {
  bucket: 'images_folder',
  opts: {
    baseUrl: 'images_folder',
  },
};

module.exports = {
  resource: homePage,
  options: {
    properties: {
      s3Key: {
        type: 'string',
      },
      bucket: {
        type: 'string',
      },
      mime: {
        type: 'string',
      },
      comment: {
        type: 'textarea',
        isSortable: false,
      },
    },
  },
  features: [
    uploadFeature({
      componentLoader, 
      provider: { local: localProvider },
      properties : { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime'  },
      validation: { mimeTypes: ['image/png'] },
    }),
  ],
};