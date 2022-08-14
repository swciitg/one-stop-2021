const LastUpadte = require("../models/lastUpdate");

exports.getLastUpdate = (req, res) => {
  LastUpadte.find().then((data) => {
    res.json(data);
  });
};

