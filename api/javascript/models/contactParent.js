const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactParentSchema = new Schema({
  section: String,
  subsection: [String]
});

const contactParent = mongoose.model('contactParent', contactParentSchema);

module.exports = contactParent;
