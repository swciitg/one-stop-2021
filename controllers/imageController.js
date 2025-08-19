import path from "path";
import sharp from "sharp";
import fs from "fs";

export const getImage = async (req, res) => {
    const imagePath = path.resolve(
        new URL('.', import.meta.url).pathname +
        "/../" +
        "images_folder" +
        "/" +
        req.query.photo_id +
        "-compressed.jpg"
    );
    console.log(imagePath);
    res.sendFile(imagePath);
};

export const getCompressedImage = async (req, res) => {
    const imagePath = path.resolve(
        new URL('.', import.meta.url).pathname +
        "/../" +
        "images_folder" +
        "/" +
        req.query.photo_id +
        "-ultracompressed.jpg"
    );
    console.log(imagePath);
    res.sendFile(imagePath);
};

export const uploadImage = async (req, res) => {
    const imagePath = path.resolve(new URL('.', import.meta.url).pathname + '/../images_folder/' + req.imageId + '.jpg');
    const compressedImagePath = path.resolve(
        new URL('.', import.meta.url).pathname +
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