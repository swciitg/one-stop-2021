const mongoose = require('mongoose');
const { allIITGHostels } = require('../helpers/constants');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  microsoftid: {
    type: String,
    required: true
  },
  outlook_email: {
    type: String,
    required: true
  },
  role: {
    type: [String],
    required: true,
    validate: function(roles){
      
    }
  },
  rollNo: {
    type: String,
    required: true
  },
  dob: {
    type: Date,
    required: true
  },
  gender: {
    type: String,
    enum: ["Male","Female","Others"],
    required: true
  },
  hostel: {
    type: String,
    enum: allIITGHostels,
    required: true
  },
  roomNo: {
    type: String,
    required: true
  },
  permanentAddress: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    min: [1000000000, "Invalid mobile number."],
    max: [9999999999, "Invalid mobile number."],
  },
  emergencyPhoneNumber: {
    type: Number,
    min: [1000000000, "Invalid mobile number."],
    max: [9999999999, "Invalid mobile number."],
  },
  deviceIDs: [String]
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
