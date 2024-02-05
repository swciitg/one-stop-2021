const multer  = require('multer')
const express = require('express');
const path = require("path");
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

homePageRouter.get("/homepage",(req,res) => {
    res.sendFile(path.resolve(__dirname, "../public/images/appLogo.svg"));
});

homePageRouter.post("/homepage", upload.single('homePageIcon'), function (req, res, next) {
    // req.file is the `profile-file` file
    // req.body will hold the text fields, if there were any
    console.log(JSON.stringify(req.file))
    var response = '<a href="/">Home</a><br>'
    response += "Files uploaded successfully.<br>"
    response += `<img src="${req.file.path}" /><br>`
    return res.send(response)
});

module.exports = {
    homePageRouter
};