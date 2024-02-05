const multer  = require('multer')
const express = require('express');
const path = require("path");
const homePageController = require("../controllers/homePageController");
const {homePage} = require("../models/homePageModel");
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
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    let homePageDoc = await homePage.find();
    await homePage.findByIdAndUpdate(homePageDoc[0]._id,{path : req.file.path},{runValidators: true});
    return res.send(response)
});

homePageRouter.get("/homeImage",async (req,res) => {
    let homePage = await homePage.find();
    await LastUpdate.findByIdAndUpdate(updatesList[0]._id,{homePage : new Date},{runValidators: true});
    res.sendFile(path.resolve(__dirname, "../" + homePage[0].path));
});

module.exports = {
    homePageRouter
};