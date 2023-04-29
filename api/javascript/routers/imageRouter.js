const express = require("express");
const path = require("path");
const imageRouter = express.Router();
imageRouter.get("/applogo", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/images/appLogo.svg"));
});
imageRouter.get("/confirmicon", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../public/images/confirm.svg"));
});
imageRouter.get("/getImage/:imageId", async (req, res) => {
    const { imageId } = req.params;
    console.log("Get image par");
    const imagePath = path.resolve(
        __dirname + "/../" + "images_folder" + "/" + imageId + "-compressed.jpg"
    );
    console.log(imagePath);
    res.sendFile(imagePath);
});

imageRouter.get("/getCompressedImage/:imageId", async (req, res) => {
    console.log("Get image par");
    const { imageId } = req.params;
    const imagePath = path.resolve(
        __dirname + "/../" + "images_folder" + "/" + imageId + "-ultracompressed.jpg"
    );
    console.log(imagePath);
    res.sendFile(imagePath);
});
module.exports = {
    imageRouter,
};
