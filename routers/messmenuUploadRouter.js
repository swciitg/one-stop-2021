const express = require('express');
const path = require('path');
const csvUploadRouter = express.Router();
const upload = require('../helpers/multer_messMenu');
const upload2 = require('../helpers/multer_hostelupload');
const { uploadmessmenu, uploaduserHostel, uploaduserMess } = require('../controllers/messmenuUploadController');


csvUploadRouter.get("/messmenu", (req, res) => {
    res.render('messmenuform.ejs'); 
});
csvUploadRouter.post('/messmenu', upload.array('csv1',15),uploadmessmenu);
csvUploadRouter.get('/hosteldata', (req, res) => {
    res.render('hosteldataform.ejs'); 
});
csvUploadRouter.post('/hosteldata', upload2.single('csv2'),uploaduserHostel);
csvUploadRouter.get('/messdata', (req, res) => {
    res.render('messdataform.ejs'); 
});
csvUploadRouter.post('/messdata', upload2.single('csv3'),uploaduserMess);


module.exports = csvUploadRouter;
