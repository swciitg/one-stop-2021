// const foodItems = require("../models/foodItems");
const foodItemsModel = require("../models/foodItems");
const foodOutlets = require("../models/foodOutlets");
// const timeModel = require("../models/timeModel");
const LastUpadte = require("../models/lastUpdate");

var Scraper = require("images-scraper");

exports.createItem = (req, res) => {
  foodItemsModel.findOne({ name: req.body.name }).then((item) => {
    if (item) {
      res.send({ message: "item already exits" });
    } else {
      const google = new Scraper({
        puppeteer: {
          headless: true,
        },
      });
      (async () => {
        const results = await google.scrape(req.body.name, 10);
        try {
          form.parse(req, function (err, fields, files) {
            console.log(files);
            let OutletName = Object.keys(files)[0];
            console.log(hostel);
            csv()
              .fromFile(files[hostel][0].path)
              .then((jsonObj) => {
                console.log("its foodOutlets model");
                foodItemsModel.find().then((oldList) => {
                  if (oldList.length !== 0) {
                    console.log("inside oldlist");
                    foodItemsModel
                      .deleteMany({ hostel: jsonObj[0]["name"] })
                      .then((result) => {
                        foodItemsModel.insertMany(jsonObj, (err, data) => {
                          console.log(jsonObj);
                          if (err) {
                            console.log(err);
                          } else {
                            console.log("saved all");
                          }
                          LastUpdate.deleteMany({}).then((da) => {
                            new LastUpdate({
                              update: new Date(),
                            })
                              .save()
                              .then((dat) => {
                                res.send({
                                  jsonObj,
                                  message: "entries saved successfully",
                                });
                              });
                          });
                        });
                      });
                  } else {
                    foodItemsModel.insertMany(jsonObj, (err, data) => {
                      console.log(jsonObj);
                      if (err) {
                        console.log(err);
                      } else {
                        console.log("saved all");
                      }
                      LastUpdate.deleteMany({}).then((da) => {
                        new LastUpdate({
                          update: new Date(),
                        })
                          .save()
                          .then((dat) => {
                            res.send({
                              jsonObj,
                              message: "entries saved successfully",
                            });
                          });
                      });
                    });
                  }
                });
                // foodItemsModel.insertMany(jsonObj, (err, data) => {
                //   if (err) {
                //     console.log(err);
                //   } else {
                //     console.log("saved all");
                //   }
                // });
                // res.send({
                //   message: "entries saved successfully",
                // });
              });
          });
        } catch (err) {
          console.log(err);
        }
        // const newfood = new foodItemsModel({
        //   OutletName: req.body.OutletName,
        //   name: req.body.name,
        //   ingredients: req.body.ingredients,
        //   veg: req.body.veg,
        //   price: req.body.price,
        //   image: results[Math.floor(Math.random() * 10)].url,
        // });
        // newfood.save().then((data) => {
        //   foodOutlets
        //     .findOneAndUpdate(
        //       { name: req.body.OutletName },
        //       { $push: { menu: newfood } }
        //     )
        //     .then((data) => {
        //       LastUpadte.deleteMany({}).then((da) => {
        //         new LastUpadte({
        //           update: new Date(),
        //         })
        //           .save()
        //           .then((dat) => {
        //             res.send({ message: "successfulyy added" });
        //           });
        //       });
        //     })
        //     .catch((err) => {
        //       res.send({ message: "error" });
        //     });
        // });
      })();
    }
  });
};

exports.getAllItems = (req, res) => {
  foodItemsModel.find().then((data) => {
    res.json(data);
  });
};

exports.updateItem = (req, res) => {
  const id = req.params.id;
  foodItemsModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
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
  foodItemsModel.find({ OutletName: req.body.OutletName }).then((data) => {
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
          res.send({ message: "deleted many" });
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
            res.send({ message: "deleted one of one" });
          });
      });
    });
  }
};
