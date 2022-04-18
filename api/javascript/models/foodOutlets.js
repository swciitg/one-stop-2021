const mongoose = require("mongoose");

const { Schema } = mongoose;

const foodOutletsSchema = new Schema({
  name: String,
  caption: String,
  closing_time: String,
  waiting_time: String,
  phone_number: Number,
  latitude: Number,
  longitude: Number,
  tags: [String],
  menu: [String],
});

const foodOutlets = mongoose.model("foodOutlet", foodOutletsSchema);

module.exports = foodOutlets;
