import mongoose from "mongoose";
import { allIITGHostels } from "../helpers/constants.js";
import { updateMessMenuInLastUpdateDocument } from "../controllers/lastUpdateController.js";

const mealSchema = new mongoose.Schema({
    mealDescription: { 
        type: String,
        required: true,
        maxLength: 200
    },
    startTiming: {
        type: Date,
        required: true
    },
    endTiming: {
        type: Date,
        required: true
    }
});

mealSchema.post('validate', async function(next) {
    if (this.startTiming.getTime() > this.endTiming.getTime()) {
        throw new Error("Start time cannot be ahead of End time");
    } else if (this.endTiming.getTime() - this.startTiming.getTime() > 4 * 60 * 60 * 1000) { // 4 hours
        throw new Error("meal duration cannot be more than 4 hours");
    }
    this.startTiming;
});

const dayMenuSchema = new mongoose.Schema({
    breakfast: {
        type: mealSchema,
        required: true
    },
    lunch: {
        type: mealSchema,
        required: true
    },
    dinner: {
        type: mealSchema,
        required: true
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
    thursday: {
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

messMenuSchema.pre('save', async function() {
    await updateMessMenuInLastUpdateDocument();
});

messMenuSchema.pre('findOneAndRemove', async function() { // adminjs calls findOneAndRemove internally
    await updateMessMenuInLastUpdateDocument();
});

messMenuSchema.pre('findOneAndUpdate', async function() { // adminjs calls findOneAndUpdate internally
    await updateMessMenuInLastUpdateDocument();
});

export default mongoose.model("messMenu", messMenuSchema);
