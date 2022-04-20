const express = require('express');
const { routes } = require('../routes');
const Controller = require('../controllers/foodOutletsController');

const foodOutletsRouter = express.Router();


foodOutletsRouter.get('/getAllOutlets', Controller.getAllOutlets);
foodOutletsRouter.post('/createOutlet', Controller.createOutlet);
foodOutletsRouter.put('/updateOutlet/:id', Controller.updateOutlet);
foodOutletsRouter.delete('/deleteOutlet/:id', Controller.deleteOutlet);
foodOutletsRouter.delete('/deletemanyoutlets', Controller.deletemanyOutlets);

module.exports = { foodOutletsRouter };
