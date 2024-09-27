const express = require('express');
const { opiResponseController } = require('../../controllers/habControllers/opiController');
const { restrictIfGuest, verifyUserRequest } = require('../../middlewares/user.auth');

const opiRouter = express.Router();

opiRouter.post('/mess/opi', verifyUserRequest, restrictIfGuest, opiResponseController);

module.exports = { opiRouter };