const mongoose = require('mongoose');

const { Schema } = mongoose;

const busTimingSchema = new Schema({
  CollegeToCity_WorkingDay: [String],
  CityToCollege_WorkingDay: [String],
  CollegeToCity_Holiday: [String],
  CityToCollege_Holiday: [String],
});

const busTiming = mongoose.model('bus_timing', busTimingSchema);

module.exports = busTiming;
