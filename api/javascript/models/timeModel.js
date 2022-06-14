const mongoose = require('mongoose');

const { Schema } = mongoose;

const timeSchema = new Schema({
  busUpdateTime: Time(),
  ferryUpdateTime: Time(),
  foodUpdateTime: Time(),
  contactUpdateTime: Time(),
});

const Time = mongoose.model('time', timeSchema);

module.exports = Time;
