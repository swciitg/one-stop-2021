import express from 'express';
import swaggerUI from 'swagger-ui-express';
import openAPI from '../oneStop-api-docs/openapi.js';

const docsRouter = express.Router();

docsRouter.use('/docs', swaggerUI.serve, swaggerUI.setup(openAPI));

export { docsRouter };
