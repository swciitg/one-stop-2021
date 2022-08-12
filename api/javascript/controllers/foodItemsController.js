// const foodItems = require("../models/foodItems");
const foodItemsModel = require("../models/foodItems");
const foodOutletsModel = require("../models/foodOutlets");
// const timeModel = require("../models/timeModel");
const LastUpadte = require("../models/lastUpdate");
var multiparty = require("multiparty");
var form = new multiparty.Form();
const csv = require("csvtojson");
const LastUpdate = require("../models/lastUpdate");

var Scraper = require("images-scraper");

exports.createItem = async (req, res) => {
  try {
    form.parse(req, async function (err, fields, files) {
      console.log(files);
      let file = Object.keys(files)[0];
      csv()
        .fromFile(files[file][0].path)
        .then(async (itemsList) => {
          // console.log(itemsList);
          let outletsSet = new Set();
          itemsList.forEach((incomingItem) => {
            outletsSet.add(incomingItem["OutletName"]);
          });
          let foodOutletsList = await foodOutletsModel.find();
          for (const outletName of outletsSet) {
            // await foodItemsModel
            //   .deleteMany({ OutletName: outletName })
            //   .then((result) => console.log(result));
            foodOutletsList.forEach((outlet) => {
              if (outlet.name === outletName) {
                outlet.menu = [];
              }
              return outlet.OutletName === outletName;
            });
          }
          itemsList.forEach((incomingItem) => {
            console.log("fhhksd");
            console.log(incomingItem);
            incomingItem["ingredients"] =
              incomingItem["ingredients"].split(",");
            incomingItem["image"] = "";
            if (incomingItem["veg"] === "TRUE") {
              incomingItem["veg"] = true;
            } else {
              incomingItem["veg"] = false;
            }
            foodOutletsList.forEach((outlet) => {
              console.log("jflsd", outlet, incomingItem.OutletName);
              if (outlet.name === incomingItem.OutletName) {
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
            console.log("fjklsd", newFoodOutlet.menu.length);
            // for (let i = 0; i < newFoodOutlet.menu.length; i++) {
            //   const google = new Scraper({
            //     puppeteer: {
            //       headless: true,
            //     },
            //   });
            //   const imageResults = await google.scrape(newFoodOutlet.menu[i]["name"], 1);
            //   console.log(imageResults);
            //   newFoodOutlet.menu[i]["image"] = imageResults[0]["url"];
            // }
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
    });
  } catch (err) {
    console.log(err);
  }
};

exports.getAllItems = (req, res) => {
  foodItemsModel.find().then((data) => {
    res.json(data);
  });
};

exports.updateItem = (req, res) => {
  const id = req.params.id;
  foodItemsModel
    .findByIdAndUpdate(id, req.body, {
      useFindAndModify: false
    })
    .then((data) => {
      LastUpadte.deleteMany({}).then((da) => {
        new LastUpadte({
            update: new Date(),
          })
          .save()
          .then((dat) => {
            res.json(data);
          });
      });
    });
};

exports.getOutletMenu = (req, res) => {
  foodItemsModel.find({
    OutletName: req.body.OutletName
  }).then((data) => {
    res.json(data);
  });
};

exports.deletemanyItems = (req, res) => {
  const arr = req.body.id;

  if (typeof arr != "string") {
    var arr2 = Object.values(arr);
    for (const id of arr2) {
      foodItemsModel.findByIdAndDelete(id).then((data) => {});
      console.log(id);
    }
    LastUpadte.deleteMany({}).then((da) => {
      new LastUpadte({
          update: new Date(),
        })
        .save()
        .then((dat) => {
          res.send({
            message: "deleted many"
          });
        });
    });
  } else {
    foodItemsModel.findByIdAndDelete(arr).then((data) => {
      LastUpadte.deleteMany({}).then((da) => {
        new LastUpadte({
            update: new Date(),
          })
          .save()
          .then((dat) => {
            res.send({
              message: "deleted one of one"
            });
          });
      });
    });
  }
};