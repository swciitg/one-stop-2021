const express = require('express');
const contactRouter = express.Router();
const Controller = require('../controllers/contactController');

contactRouter.get('/getContacts', Controller.getAllContacts);
contactRouter.post('/createcontact', Controller.createContact);
contactRouter.post('/createsection', Controller.createsection);

module.exports = {
    contactRouter: contactRouter
};