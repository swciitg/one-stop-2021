const AdminJsMongoose = require("@adminjs/mongoose");
const AdminJs = require("adminjs");
const AdminJsExpress = require("@adminjs/express");
var session = require('express-session');
var MongoDBStore = require('connect-mongodb-session')(session);
const { ADMINPANELROOT } = require("../helpers/constants");
const authenticate = require("./auth");

const messMenuResouce = require("./resources/messMenu.resource");
const userResource = require("./resources/user.resource");
const timingResource = require("./resources/transportTming.resource");
const ui = require("./ui/loader");
const { componentLoader, Components } = ui;
const styleAssets = require("./ui/style-assets");
AdminJs.registerAdapter(AdminJsMongoose);


var sessiontStore = new MongoDBStore(
    {
      uri: process.env.DATABASE_URI,
      databaseName: process.env.DATABASE_NAME,
      collection: 'userSessions'
    },
    function(error) {
      // Should have gotten an error
});

const adminjs = new AdminJs({
    resources: [messMenuResouce, userResource, timingResource],
    assets: {
        styles: styleAssets,
    },
    componentLoader,
    dashboard: { component: Components.Dashboard },
    rootPath: ADMINPANELROOT,
    loginPath: ADMINPANELROOT + "/login",
    logoutPath: ADMINPANELROOT + "/logout"
});

if (process.env.NODE_ENV === "production") {
    adminjs.initialize();
} else {
    adminjs.watch();
}

exports.adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
    adminjs,
    {
        cookiePassword: process.env.ADMIN_PANEL_COOKIE_SECRET,
        authenticate
    },
    null,
    {
        store: sessiontStore,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1 day
          },
        resave: false, saveUninitialized: true
    }
);
