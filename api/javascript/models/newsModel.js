const mongoose = require("mongoose");

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

  const newsModel = new mongoose.model("newsItem", newsSchema);

  module.exports = newsModel;