import mongoose from "mongoose";

const { Schema } = mongoose;

const transportMethodSchema = new Schema({
  method: {
    type: String,
    required: true,
  },
  recommendation: {
    type: String,
    default: "",
  },
  details: {
    type: String,
    required: true,
  },
  hasCabSharing: {
    type: Boolean,
    default: false,
  },
});

const travelGuideSchema = new Schema(
  {
    place: {
      type: String,
      required: true,
    },
    iconType: {
      type: String,
      required: true,
      enum: [
        "airplane",
        "train",
        "shopping",
        "temple",
        "market",
        "park",
        "hospital",
        "bus",
        "other",
      ],
    },
    description: {
      type: String,
      default: "",
    },
    transportMethods: [transportMethodSchema],
  },
  { timestamps: true }
);

const TravelGuide = mongoose.model("TravelGuide", travelGuideSchema);

export default TravelGuide;
