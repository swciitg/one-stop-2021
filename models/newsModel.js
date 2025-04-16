import mongoose from "mongoose";

const newsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  
  author: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  dateCreated: {
    type: Date,
    default: Date.now(),
  },
  password: {
    type: String,
    required: true,
  },
});

const newsModel = mongoose.model("newsItem", newsSchema);

export default newsModel;