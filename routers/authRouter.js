import express from 'express';
// const passport = require('passport');
import * as controllers from '../controllers/index.js';
import { microsoftLogin, microsoftLoginRedirect } from '../controllers/authController.js';

const authRouter = express.Router();

authRouter.get("/auth/microsoft", microsoftLogin);
authRouter.get("/auth/microsoft/redirect", microsoftLoginRedirect);

// authRouter.get(
//   routes.microsoftCallback,
//   passport.authenticate('microsoft', { failureRedirect: '/user-info' }),
//   controllers.authController.postMicrosoftLogin,
// );

export default authRouter;
