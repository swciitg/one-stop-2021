const express = require('express');
const { routes } = require('../routes');
const Controller = require('../controllers/foodItemsController');

const foodItemsRouter = express.Router();

foodItemsRouter.get('/getAllItems', Controller.getAllItems);
foodItemsRouter.post('/createItem', Controller.createItem);
foodItemsRouter.put('/updateItem/:id', Controller.updateItem);
foodItemsRouter.delete('/deleteItem/:id', Controller.deleteItem);
foodItemsRouter.delete('/deletemanyitems', Controller.deletemanyItems);
module.exports = { foodItemsRouter: foodItemsRouter };
