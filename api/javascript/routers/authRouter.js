const express = require('express');
// const passport = require('passport');
const controllers = require('../controllers');
const { microsoftLogin, microsoftLoginRedirect } = require('../controllers/authController');

const authRouter = express.Router();

authRouter.get("/auth/microsoft", microsoftLogin);
authRouter.get("/auth/microsoft/redirect", microsoftLoginRedirect);

// authRouter.get(
//   routes.microsoftCallback,
//   passport.authenticate('microsoft', { failureRedirect: '/user-info' }),
//   controllers.authController.postMicrosoftLogin,
// );

module.exports = { authRouter };
