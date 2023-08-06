const mongoose = require("mongoose");
const { allIITGHostelsGC } = require("../../helpers/constants");

const manthanHostelResultSchema = new mongoose.Schema({
  hostelName: {
    type: String,
    required: true,
    enum: allIITGHostelsGC,
  },
  primaryScore: {
    type: mongoose.Schema.Types.Double,
    required: true,
  },
  secondaryScore: {
    type: String
  },
  points: {
    type: mongoose.Schema.Types.Double
  }
});

const manthanEventSchema = new mongoose.Schema({
  event: {
    type: String,
    required: true,
  },
  module: {
    type: String,
    required: true,
    enum: ["Dance","Music","Content Creation","Photography","Literary","Dramatics","Film","Fine Arts","Debating","Culinary"],
  },
  date: {
    type: Date,
    required: true,
  },
  results: {
    type: [manthanHostelResultSchema],
    default: [],
    validate: function (results) {
      let set = new Set();
      results.forEach((element) => set.add(element["hostelName"]));
      if (set.size !== results.length)
        throw new Error("Some hostel is added more than once in list");
    },
  },
  venue: {
    type: String,
    required: true,
  },
  posterEmail: {
    type: String,
    required: true,
  },
  resultAdded: {
    type: Boolean,
    default: false,
  },
  victoryStatement: {
    type: String,
    default: "",
  },
});

module.exports = {
  manthanEventModel: mongoose.model("manthanEventSchedule", manthanEventSchema),
};
