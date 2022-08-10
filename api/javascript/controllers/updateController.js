const LastUpadte = require("../models/lastUpdate");

exports.getLastUpdate = (req, res) => {
  LastUpadte.find().then((data) => {
    res.json(data);
  });
};

exports.update = (req, res) => {
  LastUpadte.deleteMany({}).then((data) => {
    new LastUpadte({
      update: new Date(),
    })
      .save()
      .then((data) => {
        res.json(data);
      });
  });
};
