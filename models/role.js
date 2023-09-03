const mongoose = require('mongoose');

const { Schema } = mongoose;

const roleSchema = new Schema({
  role: String,
});

const role = mongoose.model('role', roleSchema);

module.exports = role;
