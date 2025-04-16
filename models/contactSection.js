import mongoose from "mongoose";
import { updateContactInLastUpdateDocument } from "../controllers/lastUpdateController.js";

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
  contacts: [contactsSubsectionSchema],
});

contactSectionSchema.pre('save', async function () {
  await updateContactInLastUpdateDocument();
});

contactSectionSchema.pre('findOneAndRemove', async function () {
  await updateContactInLastUpdateDocument();
});

contactSectionSchema.pre('findOneAndUpdate', async function () {
  await updateContactInLastUpdateDocument();
});

const contactSection = mongoose.model("contactSections", contactSectionSchema);

export default contactSection;
