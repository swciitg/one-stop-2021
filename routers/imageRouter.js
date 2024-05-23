const express = require('express');
const path = require("path");
const {getImage, getCompressedImage, uploadImage} = require('../controllers/imageController');
const homePage = require("../models/homePageModel");
const multer = require("multer");
const imageRouter = express.Router();
const uuid = require('uuid');

// multer config
const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, './images_folder');
    },
    filename: (req, file, callback) => {
        const imageId = uuid.v4();
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

module.exports = {imageRouter};