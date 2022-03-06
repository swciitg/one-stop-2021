const express = require('express');
const contactRouter = express.Router();
const Controller = require('../controllers/contactController')

contactRouter.post('/createcontact', Controller.createcontact )
contactRouter.put('/updatecontact/:id', Controller.updatecontact )
contactRouter.delete('/deletecontact/:id', Controller.deletecontact )

module.exports = {contactRouter};