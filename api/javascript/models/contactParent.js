const mongoose = require("mongoose");

const { Schema } = mongoose;
const contactsSubsection = require("../models/contactsSubsection").schema;

const contactParentSchema = new Schema({
  name: String,
  group: String,
  contacts: [contactsSubsection],
});

const contactParent = mongoose.model("contactParent", contactParentSchema);

module.exports = contactParent;
