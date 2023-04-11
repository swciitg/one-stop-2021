const mongoose = require('mongoose');

const { Schema } = mongoose;

const busStopSchema = new Schema({
  busStop: {
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

const busStop = mongoose.model('busStops', busStopSchema);

module.exports = busStop;
