const express = require('express');
const path = require("path");
const { homePage } = require('../controllers/homePage');
const { verifyUserRequest } = require("../middlewares/user.auth");

const homePageRouter = express.Router();

homePageRouter.get('/',verifyUserRequest, homePage );

module.exports = {
    homePageRouter
};