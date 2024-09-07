const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
    title: { type: String, required: true },
    imageURL: { type: String, required: true },
    compressedImageURL: { type: String, required: true },
    description: { type: String },
    club_org: { type: String, required: true },
    date: { type: Date, required: true },
    venue: { type: String, required: true },
    contactNumber: { type: String, required: true },
});

module.exports = mongoose.model("event", eventSchema);
