const mongoose = require("mongoose");
const userSchema = new mongoose.Schema({
  "name": {
    type: String,
    required: true
  },
  "email": {
    type: String,
    required: true,
    unique: true
  },
  "deviceTokens": {
    type: [String],
    default: []
  }
});

module.exports = {"userModel" : mongoose.model("onestopUser",userSchema)};
