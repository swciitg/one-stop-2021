import mongoose from 'mongoose';

const { Schema } = mongoose;

const timeSchema = new Schema({
  busUpdateTime: {
    type: Date,
    required: true,
  },
  ferryUpdateTime: {
    type: Date,
    required: true,
  },
  foodUpdateTime: {
    type: Date,
    required: true,
  },
  contactUpdateTime: {
    type: Date,
    required: true,
  },
});

const Time = mongoose.model('time', timeSchema);

export default Time;
