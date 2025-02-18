const express = require('express');
const { createNew, checkOPIStatus} = require('../../controllers/habControllers/opiResponseController');
const { getAllSMCEmails } = require('../../controllers/habControllers/habAdminController');
const { restrictIfGuest, verifyUserRequest } = require('../../middlewares/user.auth');

const opiRouter = express.Router();

opiRouter.post('/mess/opi', verifyUserRequest, restrictIfGuest, createNew);
opiRouter.get('/mess/opi/status', verifyUserRequest, restrictIfGuest, checkOPIStatus);
opiRouter.get('/mess/opi/smc',verifyUserRequest, getAllSMCEmails);

module.exports = { opiRouter };