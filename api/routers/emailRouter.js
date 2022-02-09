const express = require('express');
const emailRouter = express.Router();
const controllers = require('../controllers')

emailRouter.post('/send', controllers.emailController.send_email);

module.exports = {emailRouter};