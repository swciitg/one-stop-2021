// const roles = require("../roles");
const homePage = require("../../models/homePage");
// const uploadFeature = require('@admin-bro/upload')
const AdminBro = require('admin-bro');
const {
  after: uploadAfterHook,
  before: uploadBeforeHook,
} = require('../ui/actions/upload-image.hook');

// let allowedRoles = [roles.SUPERADMIN, roles.LOST];

/** @type {AdminBro.ResourceOptions} */
const options = {
  properties: {
    uploadImage: {
      components: {
        edit: AdminBro.bundle('../ui/components/upload-image.edit.tsx'),
        list: AdminBro.bundle('../ui/components/upload-image.list.tsx'),
      },
    },
  },
  actions: {
    new: {
      after: async (response, request, context) => {
        return uploadAfterHook(response, request, context);
      },
      before: async (request, context) => {
        return uploadBeforeHook(request, context);
      },
    },
    edit: {
      after: async (response, request, context) => {
        return uploadAfterHook(response, request, context);
      },
      before: async (request, context) => {
        return uploadBeforeHook(request, context);
      },
    },
    show: {
      isVisible: false,
    },
  },
};

module.exports = {
  options,
  resource: homePage,
};
