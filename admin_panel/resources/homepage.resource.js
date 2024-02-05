const uploadFeature = require('@adminjs/upload');
const homePage = require("../../models/homePageModel");
const componentLoader = require("../ui/loader");

// const localProvider = {
//   bucket: 'public',
//   opts: {
//     baseUrl: 'public',
//   },
// };

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
      provider: { local: { bucket: 'public' } },
      properties : { file: 'file', key: 's3Key', bucket: 'bucket', mimeType: 'mime'  },
      validation: { mimeTypes: ['image/png'] },
      uploadPath: (record, filename) => {
        console.log(record.id());
        console.log(filename);
        return `${record.id()}/${filename}`
      },
    }),
  ],
};