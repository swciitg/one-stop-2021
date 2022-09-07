const express = require("express");
const {routes} = require("../routes");
const buyAndSellControllers = require("../controllers/buyAndSellController");
const buyAndSellRouter = express.Router();
const fs = require("fs");
const multer = require("multer");
const {uploadFilePath} = require("../constants");
const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => {
        cb(null,__dirname + "/../files_folder/");
    },
    filename: (req,file,cb) => {
      console.log(file);
        let parts = file.originalname.split(".");
        let fileExtension = parts[parts.length-1];
        cb(null, "file." +  fileExtension);
    }
});
const upload = multer({storage: fileStorageEngine});
buyAndSellRouter.post(
  "/sell/remove",
  buyAndSellControllers.postSellRemoveDetails
);

buyAndSellRouter.get("/sell", upload.single("file"),buyAndSellControllers.getSellDetails);

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

module.exports = {
  buyAndSellRouter: buyAndSellRouter
};