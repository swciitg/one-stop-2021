const AdminJsMongoose = require("@adminjs/mongoose");
const AdminJs = require("adminjs");
const AdminJsExpress = require("@adminjs/express");
const { ADMINPANELROOT } = require("../helpers/constants");
const authenticate = require("./auth");

const messMenuResouce = require("./resources/messMenu.resource");
const userResource = require("./resources/user.resource");
const ferryTimingResource = require("./resources/ferryTiming.resource");
const busStopResource = require("./resources/busStop.resource");
const ui = require("./ui/loader");
const { componentLoader, Components } = ui;
const styleAssets = require("./ui/style-assets");

AdminJs.registerAdapter(AdminJsMongoose);
const adminjs = new AdminJs({
    resources: [messMenuResouce, userResource, ferryTimingResource, busStopResource],
    assets: {
        styles: styleAssets,
    },
    componentLoader,
    dashboard: { component: Components.Dashboard },
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
