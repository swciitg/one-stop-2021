const mongoose = require('mongoose');

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  microsoftid: String,
  emailid: String,
  role: [String],
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
