const AdminJsMongoose = require("@adminjs/mongoose");
const AdminJs = require("adminjs");
const AdminJsExpress = require("@adminjs/express");
const { ADMINPANELROOT } = require("../helpers/constants");
const authenticate = require("./auth");

const messMenuResouce = require("./resources/messMenu.resource");
const userResource = require("./resources/user.resource");
const ferryTimingResource = require("./resources/ferryTiming.resource");
const busStopResource = require("./resources/busStop.resource");
AdminJs.registerAdapter(AdminJsMongoose);


const adminjs = new AdminJs({
    resources: [messMenuResouce, userResource, ferryTimingResource, busStopResource],
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
