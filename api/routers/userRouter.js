const express = require('express');
const { routes } = require('../routes');
const controllers = require('../controllers');

const userRouter = express.Router();

userRouter.get(routes.greeting, controllers.userController.getGreetings);

module.exports = { userRouter };
