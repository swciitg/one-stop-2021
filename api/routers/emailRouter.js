const express = require('express');
const emailRouter = express.Router();
const controllers = require('../controllers')
const { routes } = require('../routes');

emailRouter.post(routes.email, controllers.emailController.send_email);

module.exports = {emailRouter};