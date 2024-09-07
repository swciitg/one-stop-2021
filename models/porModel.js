const mongoose = require("mongoose");

const porSchema = new mongoose.Schema({
    rollNo: { type: String, required: true },
    club_org: { type: String, required: true },
    position: { type: String, required: true },
});

module.exports = mongoose.model("por", porSchema);