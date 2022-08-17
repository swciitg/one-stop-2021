const express = require('express');
const {
    routes
} = require('../routes');
const Controller = require('../controllers/foodItemsController');

const foodItemsRouter = express.Router();
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
foodItemsRouter.post('/createOutletsMenu', upload.single("file"),Controller.createItem);
module.exports = {
    foodItemsRouter: foodItemsRouter
};