const express = require('express');
// const passport = require('passport');
const { routes } = require('../routes');
const controllers = require('../controllers');

const authRouter = express.Router();

authRouter.get(routes.microsoft, controllers.authController.microsoftLogin);
authRouter.get(routes.microsoft + "/redirect", controllers.authController.microsoftLoginRedirect);
// authRouter.get(
//   routes.microsoftCallback,
//   passport.authenticate('microsoft', { failureRedirect: '/user-info' }),
//   controllers.authController.postMicrosoftLogin,
// );

module.exports = { authRouter };
