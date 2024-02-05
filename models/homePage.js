const mongoose = require("mongoose");

const quickLink = new mongoose.Schema({
  priority: { type: Number, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  icon : { type: String, required: true },
});

const homePage = new mongoose.Schema({
  imagePath: { type: String, required: true },
  ratio : { type: Number, required: true },
  filename : { type: String, required: true },
  quickLinks : [quickLink],
});

module.exports = mongoose.model("homePage", homePage);
