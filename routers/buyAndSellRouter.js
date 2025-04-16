import express from "express";
import * as buyAndSellControllers from "../controllers/buyAndSellController.js";
import fs from "fs";
import upload from "../helpers/multer_single.js";
import { restrictIfGuest, verifyUserRequest } from "../middlewares/user.auth.js";

const buyAndSellRouter = express.Router();

buyAndSellRouter.post(
  "/sell/remove", verifyUserRequest, restrictIfGuest, buyAndSellControllers.postSellRemoveDetails
);
buyAndSellRouter.get("/sell", verifyUserRequest, buyAndSellControllers.getSellDetails);

buyAndSellRouter.get("/sellPage", verifyUserRequest, buyAndSellControllers.getSellPageDetails);

buyAndSellRouter.post("/sell", verifyUserRequest, restrictIfGuest, buyAndSellControllers.postSellDetails);
buyAndSellRouter.delete("/sell", verifyUserRequest, restrictIfGuest, buyAndSellControllers.deleteSellAll);

buyAndSellRouter.post(
  "/buy/remove", verifyUserRequest, restrictIfGuest, buyAndSellControllers.postBuyRemoveDetails
);
buyAndSellRouter.get("/buy", verifyUserRequest, buyAndSellControllers.getBuyDetails);
buyAndSellRouter.get("/buyPage", verifyUserRequest, buyAndSellControllers.getBuyPageDetails);

buyAndSellRouter.post("/buy", verifyUserRequest, restrictIfGuest, buyAndSellControllers.postBuyDetails);
buyAndSellRouter.delete("/buy", verifyUserRequest, restrictIfGuest, buyAndSellControllers.deleteBuyAll);

buyAndSellRouter.post("/myads", verifyUserRequest, restrictIfGuest, buyAndSellControllers.getMyAds);

buyAndSellRouter.post("/bns/myads", verifyUserRequest, restrictIfGuest, buyAndSellControllers.getMyAds);

export { buyAndSellRouter };