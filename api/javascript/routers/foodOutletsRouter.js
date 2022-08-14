const express = require('express');
const {
    routes
} = require('../routes');
const Controller = require('../controllers/foodOutletsController');

const foodOutletsRouter = express.Router();


foodOutletsRouter.get('/getAllOutlets', Controller.getAllOutlets);
foodOutletsRouter.post('/createOutletsList', Controller.createOutlet);
module.exports = {
    foodOutletsRouter
};