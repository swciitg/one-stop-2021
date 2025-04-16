import mongoose from "mongoose";

const BuyDetailsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: String, required: true },
  phonenumber: { type: String, required: true },
  date: { type: Date, default: Date.now },
  description: { type: String, required: true },
  imageURL: { type: String, required: true },
  compressedImageURL: { type: String, required: true },
  email: { type: String, required: true },
  username: { type: String, required: true },
});

const BuyItem = mongoose.model("buyItem", BuyDetailsSchema);

export default BuyItem;
