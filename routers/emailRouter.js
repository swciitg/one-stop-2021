import express from 'express';
import * as Controller from '../controllers/index.js';

const emailRouter = express.Router();

emailRouter.post('/email/send', Controller.emailController.sendEmail);

export { emailRouter };
