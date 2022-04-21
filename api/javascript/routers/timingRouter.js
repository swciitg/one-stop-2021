const express = require('express');

const timingRouter = express.Router();
const Controller = require('../controllers/timingController');

timingRouter.get('/getferrytiming', Controller.getferrytiming);
timingRouter.post('/createferrytiming', Controller.createferrytiming);
timingRouter.put('/updateferrytiming/:id', Controller.updateferrytiming);
timingRouter.delete('/deleteferrytiming/:id', Controller.deleteferrytiming);
timingRouter.delete('/deletemanyferrytimings', Controller.deletemanyferrytiming);

timingRouter.get('/getbustiming', Controller.getbustiming);
timingRouter.post('/createbustiming', Controller.createbustiming);
timingRouter.put('/updatebustiming/:id', Controller.updatebustiming);
timingRouter.delete('/deletebustiming/:id', Controller.deleteferrytiming);
timingRouter.delete('/deletemanybustimings', Controller.deletemanybustiming);

module.exports = { timingRouter };
