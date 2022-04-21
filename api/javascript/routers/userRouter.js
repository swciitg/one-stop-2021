const express = require('express');
const { routes } = require('../routes');
const Controller = require('../controllers/userController');

const userRouter = express.Router();

userRouter.get(routes.greeting, Controller.getGreetings);
userRouter.get('/getAllUsers', Controller.getAllUsers);
userRouter.put('/updateUser/:id', Controller.updateUser);
userRouter.delete('/deleteUser/:id', Controller.deleteUser);
userRouter.delete('/deletemanyusers', Controller.deletemanyUsers);
module.exports = { userRouter };
