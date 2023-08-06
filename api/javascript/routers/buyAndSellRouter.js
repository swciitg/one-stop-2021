const express = require("express");
const {routes} = require("../routes");
const buyAndSellControllers = require("../controllers/buyAndSellController");
const buyAndSellRouter = express.Router();
const fs = require("fs");
const upload = require("../helpers/multer_single");
const { restrictIfGuest, verifyUserRequest } = require("../middlewares/user.auth");
buyAndSellRouter.post(
  "/sell/remove",verifyUserRequest,restrictIfGuest,buyAndSellControllers.postSellRemoveDetails
);
buyAndSellRouter.get("/sell",verifyUserRequest,buyAndSellControllers.getSellDetails);

buyAndSellRouter.get("/sellPage",verifyUserRequest, buyAndSellControllers.getSellPageDetails);

buyAndSellRouter.post("/sell",verifyUserRequest,restrictIfGuest, buyAndSellControllers.postSellDetails);
buyAndSellRouter.delete("/sell",verifyUserRequest,restrictIfGuest, buyAndSellControllers.deleteSellAll);

buyAndSellRouter.post(
  "/buy/remove",verifyUserRequest,restrictIfGuest,buyAndSellControllers.postBuyRemoveDetails
);
buyAndSellRouter.get("/buy",verifyUserRequest, buyAndSellControllers.getBuyDetails);
buyAndSellRouter.get("/buyPage",verifyUserRequest, buyAndSellControllers.getBuyPageDetails);

buyAndSellRouter.post("/buy",verifyUserRequest,restrictIfGuest, buyAndSellControllers.postBuyDetails);
buyAndSellRouter.delete("/buy",verifyUserRequest,restrictIfGuest, buyAndSellControllers.deleteBuyAll);

buyAndSellRouter.post("/myads",verifyUserRequest,restrictIfGuest, buyAndSellControllers.getMyAds);

buyAndSellRouter.post("/bns/myads",verifyUserRequest,restrictIfGuest, buyAndSellControllers.getMyAds);

module.exports = {
  buyAndSellRouter: buyAndSellRouter
};