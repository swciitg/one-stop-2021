const mongoose = require("mongoose");

const { Schema } = mongoose;

const contactsSubsectionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  contact: {
    type: String,
    required: true
  }
});

const contactSectionSchema = new Schema({
  sectionName: {
    type: String,
    required: true
  },
  // group: String,
  contacts: [contactsSubsectionSchema],
});

const contactSection = mongoose.model("contactSections", contactSectionSchema);

module.exports = contactSection;
