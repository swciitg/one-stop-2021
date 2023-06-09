const express = require("express");
const { updateOnestopUserValidate, updateOnestopUser, logoutUserValidate, logoutUser, regenerateUserAccessToken, guestUserLogin } = require("../controllers/onestopUserController");
const { requestValidation } = require("../middlewares/validate.request");
const { verifyUserRequest } = require("../middlewares/user.auth");
const onestopUserRouter = express.Router();

// onestopUserRouter.get("/onestop-user",)
// onestopUserRouter.post("/onestop-user", createOnestopUser);
onestopUserRouter.post("/user/guest/login",guestUserLogin);
onestopUserRouter.post("/user/accesstoken",regenerateUserAccessToken);

onestopUserRouter.patch("/user",verifyUserRequest, updateOnestopUserValidate, requestValidation, updateOnestopUser);
onestopUserRouter.delete("/user/logout",verifyUserRequest,logoutUserValidate,requestValidation,logoutUser);

module.exports = onestopUserRouter;