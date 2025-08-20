import express from 'express';
import * as Controller from '../controllers/contactController.js';
import multer from "multer";
import { restrictIfGuest, verifyUserRequest } from '../middlewares/user.auth.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const contactRouter = express.Router();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../files_folder/");
    },
    filename: (req, file, cb) => {
        let parts = file.originalname.split(".");
        let fileExtension = parts[parts.length-1];
        cb(null, "file." +  fileExtension);
    }
});

const upload = multer({storage: fileStorageEngine});

contactRouter.get('/getContacts', verifyUserRequest, Controller.getAllContacts);
// contactRouter.post('/createContacts',restrictIfGuest,upload.single("file"), Controller.createContact);
// contactRouter.post('/createSections',restrictIfGuest,upload.single("file"), Controller.createsection);
// contactRouter.post('/deleteContacts',restrictIfGuest,upload.single("file"), Controller.deleteContacts);

export { contactRouter };