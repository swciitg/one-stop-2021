const mongoose = require('mongoose');

const { Schema } = mongoose;

const ferrytimingSchema = new Schema({
  name: String,
  MonToFri_GuwahatiToNorthGuwahati: [String],
  MonToFri_NorthGuwahatiToGuwahati: [String],
  Sunday_GuwahatiToNorthGuwahati: [String],
  Sunday_NorthGuwahatiToGuwahati: [String],
});

const ferryTiming = mongoose.model('ferry_timing', ferrytimingSchema);

module.exports = ferryTiming;
