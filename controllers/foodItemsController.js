import foodItemsModel from "../models/foodItems.js";
import foodOutletsModel from "../models/foodOutlets.js";
import LastUpdate from "../models/lastUpdate.js";
import csv from "csvtojson";
import { uploadFilePath } from "../constants.js";
import Scraper from "images-scraper";

function isImage(url) {
  return /\.(jpg|jpeg|png)$/.test(url);
}

export const createItem = async (req, res) => {
  try {
    // const files = req.files;
    // let file = Object.keys(files)[0];
    csv()
      .fromFile(uploadFilePath)
      .then(async (itemsList) => {
        // console.log(itemsList);
        let outletsSet = new Set();
        itemsList.forEach((incomingItem) => {
          outletsSet.add(incomingItem["outletName"]);
        });
        let foodOutletsList = await foodOutletsModel.find();
        for (const outletName of outletsSet) {
          // await foodItemsModel
          //   .deleteMany({ outletName: outletName })
          //   .then((result) => console.log(result));
          foodOutletsList.forEach((outlet) => {
            if (outlet.name === outletName) {
              outlet.menu = [];
            }
            return outlet.outletName === outletName;
          });
        }
        itemsList.forEach((incomingItem) => {
          incomingItem["ingredients"] =
            incomingItem["ingredients"].split(",");
          if (incomingItem["veg"] === "TRUE") {
            incomingItem["veg"] = true;
          } else {
            incomingItem["veg"] = false;
          }
          foodOutletsList.forEach((outlet) => {
            if (outlet.name === incomingItem.outletName) {
              outlet.menu.push(incomingItem);
            }
          });
          // let newFoodItem = new foodItemsModel(incomingItem);
          // console.log(newFoodItem);
          // await newFoodItem
          //   .save()
          //   .then((updatedItem) => console.log(updatedItem));
        });
        // console.log(foodOutletsList)
        foodOutletsList.forEach(async (newFoodOutlet) => {
          for (let i = 0; i < newFoodOutlet.menu.length; i++) {
            if(newFoodOutlet.menu[i]["image"].length!=0) continue;
            const google = new Scraper({
              puppeteer: {
                headless: true,
              }
            });
            const imageResults = await google.scrape(newFoodOutlet.menu[i]["name"], 5);
            newFoodOutlet.menu[i]["image"] = imageResults[0]["url"];
            for(let j=0;j<imageResults.length;j++){
              let checkImage = isImage(imageResults[j]["url"]);
              if(checkImage===true){
                newFoodOutlet.menu[i]["image"]=imageResults[j]["url"];
                break;
              }
            }
          }
          await newFoodOutlet.save().then((result) => console.log(result));
        });
        let updatesList = await LastUpdate.find();
        console.log(updatesList);
        await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
          food: new Date(),
        },{runValidators: true});
        res.json({
          message: "entries saved successfully",
        });
      });

  } catch (err) {
    console.log(err);
  }
};

export const getOutletMenu = async (req,res) => {
  try{
    const outletId = req.params.outletId;
    if(outletId === undefined){
      throw Error("Please specify correct outlet ID");
    }
    let foodMenu = foodItemsModel.findById(outletId);
    res.json({"success" : true,"details" : menu});
  }
  catch (err) {
    res.status(500).json({"success" : false,"message" : err.toString()});
  } 
}