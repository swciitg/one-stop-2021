const mongoose = require("mongoose");
const { allIITGHostels } = require("../helpers/constants");

const dayMealsSchema = new mongoose.Schema({
    mealDesription: { 
        type: String,
        required: true
    },
    mealType: {
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

const messMenuSchema = new mongoose.Schema({
    hostel: {
        type: String, required: true,
        enum: allIITGHostels,
        required: true
    },
    monday: {
        type: dayMealsSchema,
        required: true
    },
    tuesday: {
        type: dayMealsSchema,
        required: true
    },
    wednesday: {
        type: dayMealsSchema,
        required: true
    },
    thrusday: {
        type: dayMealsSchema,
        required: true
    },
    friday: {
        type: dayMealsSchema,
        required: true
    },
    saturday: {
        type: dayMealsSchema,
        required: true
    },
    sunday: {
        type: dayMealsSchema,
        required: true
    }
});

module.exports = mongoose.model("messMenu", messMenuSchema);
