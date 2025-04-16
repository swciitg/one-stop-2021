import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  degree: {
    type: String,
    required: true,
  },
  designation: {
    type: String,
    required: true,
  },
});

const doctorModel = mongoose.model("Doctor", doctorSchema);
export default doctorModel;
