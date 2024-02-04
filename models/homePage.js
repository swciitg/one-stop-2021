const mongoose = require("mongoose");

const quickLink = new mongoose.Schema({
  priority: { type: Number, required: true },
  title: { type: String, required: true },
  link: { type: String, required: true },
  icon : { type: String, required: true },
});

const homePage = new mongoose.Schema({
  compressedImageURL: { type: String, required: true },
  height : { type: String, required: true },
  width : { type: String, required: true },
  filename : { type: String, required: true },
  quickLinks : [quickLink],
});

module.exports = mongoose.model("homePage", homePage);
