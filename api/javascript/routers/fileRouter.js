const csv         = require('csvtojson');
const bodyParser  = require('body-parser');
const multer      = require('multer');
const path        = require('path');
const express = require('express');
const mess = require("../models/messMenu");

const { routes } = require('../routes');
const Controller = require('../controllers/fileController');

const fileRouter = express.Router();

var storage = multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,'./public/uploads');
    },
    filename:(req,file,cb)=>{
        cb(null,file.originalname);
    }
});
var uploads = multer({storage:storage});

fileRouter.post('/csvtomongo', uploads.single(''),Controller.csvToMongo);
fileRouter.get('/getallfooditems', Controller.retAllFoodItems);
fileRouter.get('/getallfoodoutlets', Controller.retAllFoodOutlets);

module.exports = {fileRouter};













