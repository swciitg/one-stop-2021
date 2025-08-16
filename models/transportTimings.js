import mongoose from "mongoose";
import { updateTimingInLastUpdateDocument } from "../controllers/lastUpdateController.js";

const { Schema } = mongoose;

const timingSchema = new Schema({
  type: {
    type: String,
    required: true,
    enum: ['FERRY', 'BUS'],
  },
  stop: {
    type: String,
    required: true,
  },
  weekdays: {
    fromCampus: {
      required: true,
      type: [Date],
    },
    toCampus: {
      required: true,
      type: [Date],
    },
  },
  weekend: {
    fromCampus: {
      required: true,
      type: [Date],
    },
    toCampus: {
      required: true,
      type: [Date],
    },
  },
});

timingSchema.pre('save', async function () {
  await updateTimingInLastUpdateDocument();
});

timingSchema.pre('findOneAndRemove', async function () { // adminjs calls findOneAndRemove internally
  await updateTimingInLastUpdateDocument();
});

timingSchema.pre('findOneAndUpdate', async function () { // adminjs calls findOneAndUpdate internally
  await updateTimingInLastUpdateDocument();
});

const transportTiming = mongoose.model("transportTiming", timingSchema);

export default transportTiming;
