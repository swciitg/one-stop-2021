const path = require("path");
const sharp = require('sharp');
const fs = require('fs');

exports.getImage = async (req, res) => {
    console.log("Get image par");
    const imagePath = path.resolve(
        __dirname +
        "/../" +
        "images_folder" +
        "/" +
        req.query.photo_id +
        "-compressed.jpg"
    );
    console.log(imagePath);
    res.sendFile(imagePath);
};

exports.getCompressedImage = async (req, res) => {
    console.log("Get image par");
    const imagePath = path.resolve(
        __dirname +
        "/../" +
        "images_folder" +
        "/" +
        req.query.photo_id +
        "-ultracompressed.jpg"
    );
    console.log(imagePath);
    res.sendFile(imagePath);
};

exports.uploadImage = async (req, res) => {
    const imagePath = path.resolve(__dirname + '/../images_folder/' + req.imageId + '.jpg');
    const compressedImagePath = path.resolve(
        __dirname +
        "/../images_folder/" +
        req.imageId +
        "-compressed.jpg"
    );
    const metadata = await sharp(imagePath).metadata();
    await sharp(imagePath)
        .resize({
            height: metadata.height < 1000 ? metadata.height : 1000,
            width: metadata.height < 1000
                ? metadata.width
                : Math.floor((metadata.width / metadata.height) * 1000),
        })
        .withMetadata()
        .toFile(compressedImagePath);
    fs.unlinkSync(imagePath);
    res.json({imageUrl: req.imageUrl});
};