import mongoose from "mongoose";

const {
  Schema
} = mongoose;

const lastUpdateSchema = new Schema({
  foodOutlet: {
    type: Date,
    default: new Date
  },
  messMenu: {
    type: Date,
    default: new Date
  },
  timing: {
    type: Date,
    default: new Date
  },
  contact: {
    type: Date,
    default: new Date
  },
  homePage: {
    type: Date,
    default: new Date
  },
});

const LastUpdate = mongoose.model("lastupdate", lastUpdateSchema);

export default LastUpdate;