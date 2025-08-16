import express from 'express';
import { createNew, checkOPIStatus } from '../../controllers/habControllers/opiResponseController.js';
import { getAllSMCEmails } from '../../controllers/habControllers/habAdminController.js';
import { restrictIfGuest, verifyUserRequest } from '../../middlewares/user.auth.js';

const opiRouter = express.Router();

opiRouter.post('/mess/opi', verifyUserRequest, restrictIfGuest, createNew);
opiRouter.get('/mess/opi/status', verifyUserRequest, restrictIfGuest, checkOPIStatus);
opiRouter.get('/mess/opi/smc', verifyUserRequest, getAllSMCEmails);

export { opiRouter };