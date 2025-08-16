import express from 'express';
import path from "path";
import { getImage, getCompressedImage, uploadImage } from '../controllers/imageController.js';
import homePage from "../models/homePageModel.js";
import multer from "multer";
import { v4 as uuidv4 } from 'uuid';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const imageRouter = express.Router();

// multer config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images_folder');
    },
    filename: (req, file, callback) => {
        const imageId = uuidv4();
        const imageUrl = process.env.API_URL + "/v3/getImage?photo_id=" + imageId;
        callback(null, imageId + '.jpg');
        req.imageUrl = imageUrl;
        req.imageId = imageId;
    }
});
const upload = multer({storage: storage});

imageRouter.get("/applogo", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/images/appLogo.svg"));
});
imageRouter.get("/confirmicon", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/images/confirm.svg"));
});

imageRouter.get("/getImage", getImage);

imageRouter.get("/getCompressedImage", getCompressedImage);

imageRouter.post("/uploadImage", upload.single('image'), uploadImage);

export { imageRouter };