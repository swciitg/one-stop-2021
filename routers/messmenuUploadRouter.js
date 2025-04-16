import express from 'express';
import upload from '../helpers/multer_messMenu.js';
import upload2 from '../helpers/multer_hostelupload.js';
import { uploadmessmenu, uploaduserHostel, uploaduserMess } from '../controllers/messmenuUploadController.js';

const csvUploadRouter = express.Router();

csvUploadRouter.get("/messmenu", (req, res) => {
    res.render('messmenuform.ejs'); 
});
csvUploadRouter.post('/messmenu', upload.array('csv2',15), uploadmessmenu);
csvUploadRouter.get('/hosteldata', (req, res) => {
    res.render('hosteldataform.ejs'); 
});
csvUploadRouter.post('/hosteldata', upload2.single('csv3'), uploaduserHostel);
csvUploadRouter.get('/messdata', (req, res) => {
    res.render('messdataform.ejs'); 
});
csvUploadRouter.post('/messdata', upload2.single('csv3'), uploaduserMess);

export default csvUploadRouter;
