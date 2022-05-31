// const foodItems = require("../models/foodItems");
const foodItemsModel = require("../models/foodItems");
const foodOutlets = require("../models/foodOutlets");
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

        const newfood = new foodItemsModel({
          OutletName: req.body.OutletName,
          name: req.body.name,
          ingredients: req.body.ingredients,
          veg: req.body.veg,
          price: req.body.price,
          image: results[Math.floor(Math.random() * 10)].url,
        });
        newfood.save().then((data) => {
          foodOutlets
            .findOneAndUpdate(
              { name: req.body.OutletName },
              { $push: { menu: newfood } }
            )
            .then((data) => {
              res.send({ message: "successfulyy added" });
            })
            .catch((err) => {
              res.send({ message: "error" });
            });
        });
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
      res.json(data);
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
    res.send({ message: "deleted many" });
  } else {
    foodItemsModel.findByIdAndDelete(arr).then((data) => {
      res.send({ message: "deleted one of one" });
    });
  }
};
