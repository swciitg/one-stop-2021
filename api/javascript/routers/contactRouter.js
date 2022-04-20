const express = require('express');

const contactRouter = express.Router();
const Controller = require('../controllers/contactController');


contactRouter.post('/getAllSubsectionContacts', Controller.getAllSubsectionContacts);
contactRouter.get('/getAllSubsections', Controller.getAllSubsections);
contactRouter.post('/createcontact', Controller.createContact);
contactRouter.put('/updatecontact/:id', Controller.updateContact);
contactRouter.delete('/deletecontact/:id', Controller.deleteContact);
contactRouter.post('/createsection', Controller.createsection);
contactRouter.delete('/deletemanycontacts', Controller.deletemanyContacts);

module.exports = { contactRouter: contactRouter };
