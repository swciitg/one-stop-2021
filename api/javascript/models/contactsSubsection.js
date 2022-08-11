const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactsSubsectionSchema = new Schema({
  groupName: String,
  name: String,
  email: String,
  contact: String,
});

const contactsSubsection = mongoose.model(
  "contactsSubsection",
  contactsSubsectionSchema
);
 
module.exports = contactsSubsection;
