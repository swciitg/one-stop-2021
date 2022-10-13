const express = require('express');
const path = require("path");
const imageRouter = express.Router();
imageRouter.get("/applogo",(req,res) => {
    res.sendFile(path.resolve(__dirname, "../public/images/appLogo.svg"));
});
imageRouter.get("/confirmicon",(req,res) => {
    res.sendFile(path.resolve(__dirname, "../public/images/confirm.svg"));
});
module.exports = {
    imageRouter
};