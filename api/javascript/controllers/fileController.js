const Menu = require("../models/messMenuItem");
const foodItems = require("../models/foodItems");
const foodOutlets = require("../models/foodOutlets");
const ferryTiming = require("../models/ferryTiming");
const busTiming = require("../models/busTiming");
const contactParent = require("../models/contactParent");
const csv = require("csvtojson");

// var multer      = require('multer');
// var path        = require('path');
exports.retAllFoodItems = (req, res) => {
  foodItems
    .find()
    .lean()
    .exec(function (err, users) {
      res.send(JSON.stringify(users));
    });
};
exports.retAllFoodOutlets = (req, res) => {
  foodItems
    .find()
    .lean()
    .exec(function (err, users) {
      res.send(JSON.stringify(users));
    });
};
exports.deleteFoodItems = (req, res) => {
  foodItems
    .deleteMany({})
    .then(function () {
      console.log("Data deleted"); // Success
    })
    .catch(function (error) {
      console.log(error); // Failure
    });
  res.send({
    message: "deleted successfully",
  });
};
exports.csvToMongo = (req, res) => {
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      console.log(jsonObj[0]);
      const myJayson = jsonObj[0];
      const temp = [];
      for (const x in myJayson) {
        temp.push(x);
      }
      if (temp[0] == "hostel") {
        console.log("its messMenu model");
        Menu.insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("saved all");
          }
          res.send({
            jsonObj,
            message: "entries saved successfully",
          });
        });
      } else if (
        temp.length == 6 &&
        temp[0] == "name" &&
        temp[1] == "ingredients"
      ) {
        console.log("its foodItems model");
        foodItems.insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("saved all");
          }
        });
        res.send({
          message: "entries saved successfully",
        });
      } else if (temp.length == 10 && temp[2] == "closing_time") {
        console.log("its foodOutlets model");
        foodOutlets.insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("saved all");
          }
        });
        res.send({
          message: "entries saved successfully",
        });
      } else if (temp[0] == "MonToFri_GuwahatiToNorthGuwahati") {
        console.log("its ferrytiming model");
        ferryTiming.insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("saved all");
          }
        });
        res.send({
          message: "entries saved successfully",
        });
      } else if (temp[0] == "CollegeToCity_WorkingDay") {
        console.log("its bustiming model");
        busTiming.insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("saved all");
          }
        });
        res.send({
          message: "entries saved successfully",
        });
      } else if (temp[0] == "section") {
        contactParent.insertMany(jsonObj, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("saved all");
          }
        });
        res.send({
          message: "entries saved successfully",
        });
      } else {
        res.send({
          message: "choose a correct file",
        });
      }
    });
};
exports.csvToJSON = (req, res) => {
  csv()
    .fromFile(req.file.path)
    .then((jsonObj) => {
      res.send(jsonObj);
    });
};

// exports.scrapingRoute = (req,res) => {
//     const google = new Scraper({
//         puppeteer: {
//           headless: false,
//         },
//       });
//     const results = google.scrape(req.body.name, 1);

// }
