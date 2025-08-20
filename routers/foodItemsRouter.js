import express from 'express';
import * as Controller from '../controllers/foodItemsController.js';
import multer from "multer";
import { restrictIfGuest, verifyUserRequest } from '../middlewares/user.auth.js';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const foodItemsRouter = express.Router();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../files_folder/");
    },
    filename: (req, file, cb) => {
        let parts = file.originalname.split(".");
        let fileExtension = parts[parts.length-1];
        cb(null, "file." + fileExtension);
    }
});

const upload = multer({storage: fileStorageEngine});

foodItemsRouter.get('/outlet-menu/:outletId', verifyUserRequest, Controller.getOutletMenu);
foodItemsRouter.post('/createOutletsMenu', verifyUserRequest, restrictIfGuest, upload.single("file"), Controller.createItem);

export { foodItemsRouter };