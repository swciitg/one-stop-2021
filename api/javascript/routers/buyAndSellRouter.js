const express = require("express");
const {routes} = require("../routes");
const buyAndSellControllers = require("../controllers/buyAndSellController");
const buyAndSellRouter = express.Router();
const fs = require("fs");
const upload = require("../helpers/multer_single");
const { restrictIfGuest } = require("../middlewares/user.auth");
buyAndSellRouter.post(
  "/sell/remove",restrictIfGuest,buyAndSellControllers.postSellRemoveDetails
);

buyAndSellRouter.get("/sell",buyAndSellControllers.getSellDetails);

buyAndSellRouter.get("/sellPage", buyAndSellControllers.getSellPageDetails);

buyAndSellRouter.post("/sell",restrictIfGuest, buyAndSellControllers.postSellDetails);
buyAndSellRouter.delete("/sell",restrictIfGuest, buyAndSellControllers.deleteSellAll);

buyAndSellRouter.post(
  "/buy/remove",restrictIfGuest,buyAndSellControllers.postBuyRemoveDetails
);
buyAndSellRouter.get("/buy", buyAndSellControllers.getBuyDetails);
buyAndSellRouter.get("/buyPage", buyAndSellControllers.getBuyPageDetails);

buyAndSellRouter.post("/buy",restrictIfGuest, buyAndSellControllers.postBuyDetails);
buyAndSellRouter.delete("/buy",restrictIfGuest, buyAndSellControllers.deleteBuyAll);

buyAndSellRouter.post("/myads",restrictIfGuest, buyAndSellControllers.getMyAds);

buyAndSellRouter.post("/bns/myads",restrictIfGuest, buyAndSellControllers.getMyAds);

module.exports = {
  buyAndSellRouter: buyAndSellRouter
};