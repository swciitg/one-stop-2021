const express = require("express");
const {
  routes
} = require("../routes");
const buyAndSellControllers = require("../controllers/buyAndSellController");
const buyAndSellRouter = express.Router();
const multer = require("multer");
const fs = require("fs");

buyAndSellRouter.post(
  "/sell/remove",
  buyAndSellControllers.postSellRemoveDetails
);

buyAndSellRouter.get("/sell", buyAndSellControllers.getSellDetails);

buyAndSellRouter.post("/sell", buyAndSellControllers.postSellDetails);

buyAndSellRouter.post(
  "/buy/remove",
  buyAndSellControllers.postBuyRemoveDetails
);
buyAndSellRouter.get("/buy", buyAndSellControllers.getBuyDetails);

buyAndSellRouter.post("/buy", buyAndSellControllers.postBuyDetails);

buyAndSellRouter.get("/myads", buyAndSellControllers.getMyAds);

module.exports = {
  buyAndSellRouter: buyAndSellRouter
};