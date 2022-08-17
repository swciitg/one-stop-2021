const routes = require('../routes');
const express = require("express");
const Controller = require("../controllers/messMenuController");
const messMenuRouter = express.Router();
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
messMenuRouter.get("/hostelsMessMenu", Controller.getAllMenuItems);
messMenuRouter.post("/createMessMenu", upload.single("file"),Controller.createMessMenu);

module.exports = {
    messMenuRouter
};