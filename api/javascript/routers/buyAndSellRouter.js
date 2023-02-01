const express = require("express");
const {routes} = require("../routes");
const buyAndSellControllers = require("../controllers/buyAndSellController");
const buyAndSellRouter = express.Router();
const fs = require("fs");
const upload = require("../helpers/multer_single");
buyAndSellRouter.post(
  "/sell/remove",
  buyAndSellControllers.postSellRemoveDetails
);

buyAndSellRouter.get("/sell",buyAndSellControllers.getSellDetails);

buyAndSellRouter.get("/sellPage", buyAndSellControllers.getSellPageDetails);

buyAndSellRouter.post("/sell", buyAndSellControllers.postSellDetails);
buyAndSellRouter.delete("/sell", buyAndSellControllers.deleteSellAll);

buyAndSellRouter.post(
  "/buy/remove",
  buyAndSellControllers.postBuyRemoveDetails
);
buyAndSellRouter.get("/buy", buyAndSellControllers.getBuyDetails);
buyAndSellRouter.get("/buyPage", buyAndSellControllers.getBuyPageDetails);

buyAndSellRouter.post("/buy", buyAndSellControllers.postBuyDetails);
buyAndSellRouter.delete("/buy", buyAndSellControllers.deleteBuyAll);

buyAndSellRouter.post("/myads", buyAndSellControllers.getMyAds);

buyAndSellRouter.post("/bns/myads", buyAndSellControllers.getMyAds);

module.exports = {
  buyAndSellRouter: buyAndSellRouter
};