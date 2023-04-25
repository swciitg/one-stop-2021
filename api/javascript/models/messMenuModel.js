const mongoose = require("mongoose");
const { allIITGHostels } = require("../helpers/constants");

const mealSchema = new mongoose.Schema({
    mealDesription: { 
        type: String,
        required: true
    },
    timing: {
        type: String,
        enum: ["8:00 AM - 9:45 AM","8:00 AM - 10:15 AM"],
        required: true
    }
});

const dayMenuSchema = new mongoose.Schema({
    breakfast: {
        type: mealSchema
    },
    lunch: {
        type: mealSchema
    },
    dinner: {
        type: mealSchema
    },
});

const messMenuSchema = new mongoose.Schema({
    hostel: {
        type: String,
        enum: allIITGHostels,
        required: true
    },
    monday: {
        type: dayMenuSchema,
        required: true
    },
    tuesday: {
        type: dayMenuSchema,
        required: true
    },
    wednesday: {
        type: dayMenuSchema,
        required: true
    },
    thrusday: {
        type: dayMenuSchema,
        required: true
    },
    friday: {
        type: dayMenuSchema,
        required: true
    },
    saturday: {
        type: dayMenuSchema,
        required: true
    },
    sunday: {
        type: dayMenuSchema,
        required: true
    }
});

module.exports = mongoose.model("messMenu", messMenuSchema);
