const mongoose = require('mongoose');

const { Schema } = mongoose;

const contactsSubsectionSchema = new Schema({
  subsection : String,
  name       : String,
  phoneNumber: Number,
  email      : String,
 
});

const contactsSubsection = mongoose.model('contactsSubsection', contactsSubsectionSchema);

module.exports = contactsSubsection ;
