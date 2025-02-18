const express = require('express');
const swaggerUI = require('swagger-ui-express');
const openAPI = require('../oneStop-api-docs/openapi.js');

const docsRouter = express.Router();

docsRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(openAPI));

module.exports = {docsRouter};
