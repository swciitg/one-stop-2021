const foodOutletsModel = require("../models/foodOutlets");

exports.createOutlet = (req, res) => {
  foodOutletsModel.findOne({ name: req.body.name }).then((outlet) => {
    if (outlet) {
      res.send({ message: "Outlet already exits" });
    } else {
      new foodOutletsModel({
        name    : req.body.name,
        caption : req.body.caption,
        closing_time: req.body.closing_time,
        waiting_time: req.body.waiting_time,
        phone_number: req.body.phone_number,
        location: [
          {
            latitude: req.body.latitude,
            longitude: req.body.longitude,
          },
        ],
        tags: req.body.tags,   
      })
        .save()
        .then((data) => {
          res.json(data);
        });
    }
  });
};

exports.getAllOutlets = (req, res) => {
    foodOutletsModel.find().then((data) => {
    res.json(data);
  });
};

exports.updateOutlet = (req, res) => {
  const id = req.params.id;
  foodOutletsModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      res.json(data);
    });
};

exports.deleteOutlet = (req, res) => {
  const id = req.params.id;
  foodOutletsModel.findByIdAndDelete(id).then((data) => {
    res.send({
      message: "Outlet was deleted successfully!",
    });
  });
};
