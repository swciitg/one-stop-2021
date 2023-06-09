const express = require('express');
const contactRouter = express.Router();
const Controller = require('../controllers/contactController');
const multer = require("multer");
const { restrictIfGuest, verifyUserRequest } = require('../middlewares/user.auth');
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
contactRouter.use(verifyUserRequest);
contactRouter.get('/getContacts', Controller.getAllContacts);
contactRouter.post('/createContacts',restrictIfGuest,upload.single("file"), Controller.createContact);
contactRouter.post('/createSections',restrictIfGuest,upload.single("file"), Controller.createsection);
contactRouter.post('/deleteContacts',restrictIfGuest,upload.single("file"), Controller.deleteContacts);
module.exports = {
    contactRouter: contactRouter
};