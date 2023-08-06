const mongoose = require("mongoose");
const {updateContactInLastUpdateDocument } = require("../controllers/lastUpdateController");

const { Schema } = mongoose;

const contactsSubsectionSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String
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

contactSectionSchema.pre('save',async function(){
  await updateContactInLastUpdateDocument();
});

contactSectionSchema.pre('findOneAndRemove',async function(){ // adminjs calls findOneAndRemove internally
  await updateContactInLastUpdateDocument();
});

contactSectionSchema.pre('findOneAndUpdate',async function(){ // adminjs calls findOneAndUpdate internally
  await updateContactInLastUpdateDocument();
});

const contactSection = mongoose.model("contactSections", contactSectionSchema);

module.exports = contactSection;
