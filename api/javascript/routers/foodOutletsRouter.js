const express = require('express');
const {
    routes
} = require('../routes');
const Controller = require('../controllers/foodOutletsController');

const foodOutletsRouter = express.Router();
const multer = require("multer");
const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,__dirname + "/../files_folder/");
    },
    filename: (req,file,cb) => {
      console.log(file);
        let parts = file.originalname.split(".");
        let fileExtension = parts[parts.length-1];
        cb(null, "file." +  fileExtension);
    }
});
const upload = multer({storage: fileStorageEngine});

foodOutletsRouter.get('/getAllOutlets', Controller.getAllOutlets);
foodOutletsRouter.post('/createOutletsList', upload.single("file"),Controller.createOutlet);
module.exports = {
    foodOutletsRouter
};