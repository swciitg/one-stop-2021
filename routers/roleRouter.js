import express from 'express';
import * as Controller from '../controllers/roleController.js';

const roleRouter = express.Router();

roleRouter.get('/getAllRoles', Controller.getAllRoles);
roleRouter.post('/createRole', Controller.createRole);
roleRouter.put('/updateRole/:id', Controller.updateRole);
roleRouter.delete('/deletemanyRoles', Controller.deletemanyRoles);

export { roleRouter };
