const mongoose = require("mongoose");
const foodItem = require("../models/foodItems").schema;

const { Schema } = mongoose;

const foodOutletsSchema = new Schema({
  name: String,
  caption: String,
  closing_time: String,
  waiting_time: String,
  phone_number: Number,
  latitude: Number,
  longitude: Number,
  address: String,
  tags: [{type: String}],
  menu: [foodItem],
});

const foodOutlets = mongoose.model("foodOutlet", foodOutletsSchema);

module.exports = foodOutlets;
