const mongoose = require("mongoose");
const { allIITGHostels } = require("../helpers/constants");

const messMenuSchema = new mongoose.Schema({
    hostel: {
        type: String, required: true,
        enum: allIITGHostels,
        required: true
    },
    day: {
        type: String,
        enum: ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday", "sunday"],
        required: true,
    },
    mealDesription: { 
        type: String,
        required: true
    },
    meal: {
            type: String,
            enum: ["breakfast", "lunch", "dinner"],
            required: true
    },
    timing: { 
        type: String,
        enum: ["8:00 AM - 9:45 AM","8:00 AM - 10:15 AM"],
        required: true
    }
});

module.exports = mongoose.model("messMenu", messMenuSchema);
