const express = require("express");
const newsRouter = express.Router();
const Controller = require("../controllers/newsController");
newsRouter.get("/news",Controller.getNewsItems);
module.exports = { newsRouter };