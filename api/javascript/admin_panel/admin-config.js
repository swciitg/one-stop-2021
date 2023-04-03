const AdminJsMongoose = require("@adminjs/mongoose");
const AdminJs = require("adminjs");
const AdminJsExpress = require("@adminjs/express");
const { ADMINPANELROOT } = require("../helpers/constants");
const { spardhaEventModel } = require("../models/gcModels/spardhaModel");
const foodOutlets = require("../models/foodOutlets");

AdminJs.registerAdapter(AdminJsMongoose);

// admin panel setup

const adminjs = new AdminJs({
    resources: [
        // {
        //     resource: spardhaEventModel
        // },
        // {
        //     resource: foodOutlets,
        //     options: {
        //         actions: {
        //             edit: { isAccessible: true }
        //         },
        //     },
        // }
    ],
    rootPath: ADMINPANELROOT
});

exports.adminJsRouter = AdminJsExpress.buildRouter(adminjs);