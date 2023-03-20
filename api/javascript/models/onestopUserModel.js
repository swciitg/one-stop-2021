const mongoose = require("mongoose");

const onestopUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  deviceToken: {
    type: [String],
    default: [],
  },
});

module.exports = {
  onestopUserModel: mongoose.model("onestopUser", onestopUserSchema),
};
