import * as AdminJsMongoose from "@adminjs/mongoose";
import AdminJs from "adminjs";
import AdminJsExpress from "@adminjs/express";
import session from "express-session";
import MongoDBStore from "connect-mongodb-session";
import { ADMINPANELROOT } from "../helpers/constants.js";
import authenticate from "./auth.js";

import messMenuResouce from "./resources/messMenu.resource.js";
import userResource from "./resources/user.resource.js";
import timingResource from "./resources/transportTming.resource.js";
import * as ui from "./ui/loader.js";
import styleAssets from "./ui/style-assets.js";
import cabSharingResource from "./resources/campusTravel.resource.js";
import lostItemResource from "./resources/lostItem.resource.js";
import foundItemResource from "./resources/foundItem.resource.js";
import adminResource from "./resources/admin.resource.js";
import contactsResource from "./resources/contacts.resource.js";
import foodOutletResource from "./resources/foodOutlet.resource.js";
import announcementResource from "./resources/announcement.resource.js";
import buyItemResource from "./resources/buyItem.resource.js";
import sellItemResource from "./resources/sellItem.resource.js";
import homePageResource from "./resources/homepage.resource.js";
import hospitalContactResource from "./resources/hospitalContact.resource.js";
import hospitalTimetableResource from "./resources/hospitalTimeTable.resource.js";
import doctorResource from "./resources/doctor.resource.js";
import habAdminResource from "./resources/hab.resource.js";
import privatekeyResource from "./resources/privateKey.resource.js";

// Create MongoDB session store
const SessionStore = MongoDBStore(session);

const { componentLoader, Components } = ui;

AdminJs.registerAdapter(AdminJsMongoose);

var sessiontStore = new SessionStore(
    {
      uri: process.env.DATABASE_URI,
      databaseName: process.env.DATABASE_NAME,
      collection: 'userSessions'
    },
    function(error) {
      // Should have gotten an error
});

const adminjs = new AdminJs({
    resources: [announcementResource, messMenuResouce, foodOutletResource, adminResource, userResource, timingResource, contactsResource, cabSharingResource, lostItemResource, foundItemResource, buyItemResource, sellItemResource, homePageResource,  habAdminResource, doctorResource, hospitalContactResource, hospitalTimetableResource , privatekeyResource],
    assets: {
        styles: styleAssets
    },
    componentLoader,
    dashboard: { component: Components.Dashboard },
    rootPath: ADMINPANELROOT,
    loginPath: ADMINPANELROOT + "/login",
    logoutPath: ADMINPANELROOT + "/logout"
});

adminjs.watch();

export const adminJsRouter = AdminJsExpress.buildAuthenticatedRouter(
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
