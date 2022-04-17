const express = require('express');

const contactRouter = express.Router();
const Controller = require('../controllers/contactController');

contactRouter.post('/getAllContacts', Controller.getAllContacts);
contactRouter.get('/getAllSubsections', Controller.getAllSubsections);
contactRouter.post('/createcontact', Controller.createContact);
contactRouter.put('/updatecontact/:id', Controller.updateContact);
contactRouter.delete('/deletecontact/:id', Controller.deleteContact);

module.exports = { contactRouter };
