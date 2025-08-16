import express from "express";
import * as Controller from "../controllers/newsController.js";

const newsRouter = express.Router();

newsRouter.get("/news", Controller.getNewsItems);
newsRouter.post("/news", Controller.createNewsItem);
newsRouter.patch("/news/:id", Controller.updateNewsItem);
newsRouter.delete("/news/:id", Controller.deleteNewsItem);

export { newsRouter };