const express = require('express');
const path = require("path");
const { getImage, getCompressedImage } = require('../controllers/imageController');
const imageRouter = express.Router();

imageRouter.get("/applogo",(req,res) => {
    res.sendFile(path.resolve(__dirname, "../public/images/appLogo.svg"));
});
imageRouter.get("/confirmicon",(req,res) => {
    res.sendFile(path.resolve(__dirname, "../public/images/confirm.svg"));
});

imageRouter.get("/getImage", getImage);

imageRouter.get("/getCompressedImage", getCompressedImage);


module.exports = {
    imageRouter
};