const AdminJsMongoose = require("@adminjs/mongoose");
const AdminJs = require("adminjs");
const AdminJsExpress = require("@adminjs/express");
const { ADMINPANELROOT } = require("../helpers/constants");
const authenticate = require("./auth");

const messMenuResouce = require("./resources/messMenu.resource");
const userResource = require("./resources/user.resource");
const timingResource = require("./resources/transportTming.resource");
AdminJs.registerAdapter(AdminJsMongoose);


const adminjs = new AdminJs({
    resources: [messMenuResouce, userResource, timingResource],
    rootPath: ADMINPANELROOT,
    loginPath: ADMINPANELROOT + "/login",
    logoutPath: ADMINPANELROOT + "/logout",
});

exports.adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
    adminjs,
    {
        cookiePassword: process.env.ADMIN_PANEL_COOKIE_SECRET,
        authenticate,
    },
    null,
    { resave: false, saveUninitialized: true }
);
