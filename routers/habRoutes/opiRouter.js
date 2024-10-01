const express = require('express');
const { createNew } = require('../../controllers/habControllers/opiResponseController');
const { restrictIfGuest, verifyUserRequest } = require('../../middlewares/user.auth');

const opiRouter = express.Router();

opiRouter.post('/mess/opi', verifyUserRequest, restrictIfGuest, createNew);

module.exports = { opiRouter };