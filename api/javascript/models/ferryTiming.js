const mongoose = require('mongoose');

const { Schema } = mongoose;

const ferrytimingSchema = new Schema({
  ferryGhat: {
    type: String,
    required: true
  },
  weekdays_campusToCity: {
    type: [Date],
    default: []
  },
  weekdays_cityToCampus: {
    type: [Date],
    default: []
  },
  weekend_cityToCampus: {
    type: [Date],
    default: []
  },
  weekend_campusToCity: {
    type: [Date],
    default: []
  }
});

const ferryTiming = mongoose.model('ferry_timing', ferrytimingSchema);

module.exports = ferryTiming;
