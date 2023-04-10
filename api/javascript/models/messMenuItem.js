const mongoose = require("mongoose");

const messMenuSchema = new mongoose.Schema({
    hostel: { type: String, required: true },
    day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        required: true,
    },
    meal: { type: String, required: true },
    menu: { type: String, enum: ["breakfast", "lunch", "dinner"], required: true },
    timing: { type: String, required: true },
});

module.exports = mongoose.model("messMenu", messMenuSchema);
