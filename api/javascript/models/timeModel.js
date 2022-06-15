const mongoose = require('mongoose');

const { Schema } = mongoose;

const timeSchema = new Schema({
  busUpdateTime: Time(),
  ferryUpdateTime: {
    type: Date,
    required: true,
  },
  foodUpdateTime: {
    type: Date(),
    required: true,
  },
  contactUpdateTime: {
    type: Date(),
    required: true,
  },
});

const Time = mongoose.model('time', timeSchema);

module.exports = Time;
