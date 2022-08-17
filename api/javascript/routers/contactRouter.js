const express = require('express');
const contactRouter = express.Router();
const Controller = require('../controllers/contactController');
const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,__dirname + "/../files_folder/");
    },
    filename: (req,file,cb) => {
      console.log("here");
      console.log(file);
        let parts = file.originalname.split(".");
        console.log(parts);
        let fileExtension = parts[parts.length-1];
        console.log(fileExtension);
        cb(null, "file." +  fileExtension);
    }
});
const upload = multer({storage: fileStorageEngine});
contactRouter.get('/getContacts', Controller.getAllContacts);
contactRouter.post('/createContacts',upload.single("file"), Controller.createContact);
contactRouter.post('/createSections',upload.single("file"), Controller.createsection);
contactRouter.post('/deleteContacts',upload.single("file"), Controller.deleteContacts);
module.exports = {
    contactRouter: contactRouter
};