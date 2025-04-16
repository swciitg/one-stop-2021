import mongoose from "mongoose";
import { allIITGHostels } from "../../helpers/constants.js";

const messSchema = new mongoose.Schema({
  messName: {
    type: String,
    required: true,
    enum: allIITGHostels,
  },
  inComing: {
    // emails of all users who have subscribed to this mess
    type: [String],
    default: [],
  },
  outGoing: {
    // emails of all users who have unsubscribed to this mess
    type: [String],
    default: [],
  }
});

const Mess = mongoose.model("Mess", messSchema);

export { Mess };