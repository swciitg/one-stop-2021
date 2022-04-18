const express = require('express');

const contactRouter = express.Router();
const Controller = require('../controllers/contactSubsectionController');

contactRouter.get('/getAllContacts', Controller.getAllContacts);
contactRouter.post('/getAllSubsectionContacts', Controller.getAllSubsectionContacts);
contactRouter.get('/getAllSubsections', Controller.getAllSubsections);
contactRouter.post('/createcontact', Controller.createContact);
contactRouter.put('/updatecontact/:id', Controller.updateContact);
contactRouter.delete('/deletecontact/:id', Controller.deleteContact);

module.exports = { contactRouter: contactRouter };
