const express = require('express');
const {
    routes
} = require('../routes');
const Controller = require('../controllers/foodItemsController');

const foodItemsRouter = express.Router();

foodItemsRouter.post('/createOutletsMenu', Controller.createItem);
module.exports = {
    foodItemsRouter: foodItemsRouter
};