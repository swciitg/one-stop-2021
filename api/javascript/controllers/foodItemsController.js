const foodItemsModel = require("../models/foodItems");

exports.createItem = (req, res) => {
  foodItemsModel.findOne({ name: req.body.name }).then((item) => {
    if (item) {
      res.send({ message: "item already exits" });
    } else {
      new foodItemsModel({
        OutletName : req.body.OutletName,
        name       : req.body.name,
        ingredients: req.body.ingredients,
        veg        : req.body.veg,
        price      : req.body.price,
        //image      : req.body.image
      })
        .save()
        .then((data) => {
          res.json(data);
        });
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

exports.deleteItem = (req, res) => {
  const id = req.params.id;
  foodItemsModel.findByIdAndDelete(id).then((data) => {
    res.send({
      message: "Item was deleted successfully!",
    });
  });
};

exports.getOutletMenu = (req, res) => {
  foodItemsModel.find({OutletName : req.body.OutletName}).then(data => {
      res.json(data);
  })
};