const mongoose = require("mongoose");

const {
  Schema
} = mongoose;

const lastUpdateSchema = new Schema({
  food: Date,
  menu: Date,
  travel: Date,
  contact: Date,
});

const lastUpdate = mongoose.model("last_update", lastUpdateSchema);

module.exports = lastUpdate;