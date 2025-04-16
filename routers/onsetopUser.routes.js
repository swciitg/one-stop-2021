import express from "express";
import {
    updateOnestopUserValidate,
    updateOnestopUser,
    regenerateUserAccessToken,
    guestUserLogin,
    getUserInfo,
    updateOnestopUserDeviceTokenValidate,
    updateOnestopUserDeviceToken,
    postOnestopUserDeviceTokenValidate,
    postOnestopUserDeviceToken,
    getUserByEmail,
    addBlockedFalseAndNotifPrefs,
    getUserPersonalNotifs,
    deleteUserPersonalNotifs,
    updateOnestopUserNotifPrefsValidate,
    updateOnestopUserNotifPrefs,
    getUserId
} from "../controllers/onestopUserController.js";
import { requestValidation } from "../middlewares/validate.request.js";
import { verifyUserRequest, restrictIfGuest } from "../middlewares/user.auth.js";

const onestopUserRouter = express.Router();

// onestopUserRouter.get("/onestop-user",)
// onestopUserRouter.post("/onestop-user", createOnestopUser);
onestopUserRouter.post("/user/guest/login", guestUserLogin);
onestopUserRouter.post("/user/accesstoken", regenerateUserAccessToken);

onestopUserRouter.get("/user", verifyUserRequest, getUserInfo);
onestopUserRouter.get("/user/getUserId", verifyUserRequest, restrictIfGuest, getUserId);
onestopUserRouter.patch("/user", verifyUserRequest, restrictIfGuest, updateOnestopUserValidate, requestValidation, updateOnestopUser);
onestopUserRouter.post("/user/device-tokens", verifyUserRequest, restrictIfGuest, postOnestopUserDeviceTokenValidate, requestValidation, postOnestopUserDeviceToken);
onestopUserRouter.patch("/user/device-tokens", verifyUserRequest, restrictIfGuest, updateOnestopUserDeviceTokenValidate, requestValidation, updateOnestopUserDeviceToken);
onestopUserRouter.get("/user/email/:email", getUserByEmail);
onestopUserRouter.get("/user/notifs", verifyUserRequest, restrictIfGuest, getUserPersonalNotifs);
onestopUserRouter.patch("/user/notifs/prefs", verifyUserRequest, restrictIfGuest, updateOnestopUserNotifPrefsValidate, requestValidation, updateOnestopUserNotifPrefs);
onestopUserRouter.delete("/user/notifs", verifyUserRequest, restrictIfGuest, deleteUserPersonalNotifs);
//onestopUserRouter.delete("/user/logout",verifyUserRequest,logoutUserValidate,requestValidation,logoutUser);

onestopUserRouter.patch("/user/bug-fix", addBlockedFalseAndNotifPrefs);

export default onestopUserRouter;