const express  = require('express');
const onestopUserRouter = express.Router();

onestopUserRouter.get('/onestop-user');
onestopUserRouter.post('/onestop-user');
onestopUserRouter.post('/onestop-user/send/:id');