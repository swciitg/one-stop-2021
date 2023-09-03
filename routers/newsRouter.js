const express = require("express");
const newsRouter = express.Router();
const Controller = require("../controllers/newsController");
newsRouter.get("/news",Controller.getNewsItems);
newsRouter.post("/news",Controller.createNewsItem);
newsRouter.patch("/news/:id",Controller.updateNewsItem);
newsRouter.delete("/news/:id",Controller.deleteNewsItem);
module.exports = { newsRouter };