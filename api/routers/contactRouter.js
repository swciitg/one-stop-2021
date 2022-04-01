const express = require('express');
const contactRouter = express.Router();
const Controller = require('../controllers/contactController')
const { routes } = require('../routes');

contactRouter.post(routes.createContact, Controller.createcontact )
contactRouter.put(routes.updateContact, Controller.updatecontact )
contactRouter.delete(routes.deleteContact, Controller.deletecontact )

module.exports = {contactRouter};