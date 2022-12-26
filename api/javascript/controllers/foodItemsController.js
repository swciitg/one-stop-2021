const foodItemsModel = require("../models/foodItems");
const foodOutletsModel = require("../models/foodOutlets");
const LastUpadte = require("../models/lastUpdate");
const csv = require("csvtojson");
const LastUpdate = require("../models/lastUpdate");
const {uploadFilePath} = require("../constants");
var Scraper = require("images-scraper");

function isImage(url) {
  return /\.(jpg|jpeg|png)$/.test(url);
}

exports.createItem = async (req, res) => {
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
          console.log("fhhksd");
          console.log(incomingItem);
          incomingItem["ingredients"] =
            incomingItem["ingredients"].split(",");
          if (incomingItem["veg"] === "TRUE") {
            incomingItem["veg"] = true;
          } else {
            incomingItem["veg"] = false;
          }
          foodOutletsList.forEach((outlet) => {
            console.log("jflsd", outlet, incomingItem.outletName);
            if (outlet.name === incomingItem.outletName) {
              console.log("I am here");
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
            console.log("fjklsd", newFoodOutlet.menu[i]["image"].length);
            console.log(newFoodOutlet.menu[i]["image"]);
            if(newFoodOutlet.menu[i]["image"].length!=0) continue;
            const google = new Scraper({
              puppeteer: {
                headless: true,
              }
            });
            const imageResults = await google.scrape(newFoodOutlet.menu[i]["name"], 5);
            console.log(newFoodOutlet.menu[i]["name"]);
            console.log(imageResults);
            newFoodOutlet.menu[i]["image"] = imageResults[0]["url"];
            for(let j=0;j<imageResults.length;j++){
              let checkImage = isImage(imageResults[j]["url"]);
              if(checkImage===true){
                console.log("here");
                console.log(newFoodOutlet.menu[i]["name"],imageResults[j]["url"]);
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
        });
        res.json({
          message: "entries saved successfully",
        });
      });

  } catch (err) {
    console.log(err);
  }
};