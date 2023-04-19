const mongoose = require("mongoose");
const { Schema } = mongoose;
const timingSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['FERRY', 'BUS'],
  },
  stop: {
    type: String,
    required: true,
  },
  weekdays: {
    fromCampus: {
      required: true,
      type: [Date],
    },
    toCampus: {
      required: true,
      type: [Date],
    },
  },
  weekend: {
    fromCampus: {
      required: true,
      type: [Date],
    },
    toCampus: {
      required: true,
      type: [Date],
    },
  },
});

const transportTiming = mongoose.model("transportTiming", timingSchema);

module.exports = transportTiming;
