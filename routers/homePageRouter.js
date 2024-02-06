const multer  = require('multer')
const express = require('express');
const path = require("path");
const homePageController = require("../controllers/homePageController");
const { homePage } = require("../models/homePageModel");
const homePageRouter = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images_folder/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

homePageRouter.get("/homepage", homePageController.getHomePageData);

homePageRouter.post("/homepage", upload.single('image'), async (req, res, next)  => {
    console.log(JSON.stringify(req.file));
    let homePageDoc = await homePage.find();
    await homePage.findByIdAndUpdate(homePageDoc[0]._id,{path : req.file.path},{runValidators: true});
    return res.send(req.file.path)
});

homePageRouter.get("/homeImage",async (req,res) => {
    let homePageData = await homePage.find();
    res.sendFile(path.resolve(__dirname, "../" + homePageData[0].path));
});

module.exports = {
    homePageRouter
};