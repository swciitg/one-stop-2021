const express = require("express");
const { updateOnestopUserValidate, updateOnestopUser, logoutUserValidate, logoutUser } = require("../controllers/onestopUserController");
const { requestValidation } = require("../middlewares/validate.request");
const onestopUserRouter = express.Router();

// onestopUserRouter.get("/onestop-user",)
// onestopUserRouter.post("/onestop-user", createOnestopUser);
onestopUserRouter.patch("/user/:userid", updateOnestopUserValidate, requestValidation, updateOnestopUser);
onestopUserRouter.delete("/user/:userid",logoutUserValidate,requestValidation,logoutUser);

module.exports = onestopUserRouter;
