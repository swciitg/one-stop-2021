import mongoose from "mongoose";

const topicNotifModelSchema = new mongoose.Schema({
    category: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    }
}, {timestamps: true});

export default mongoose.model("topicNotifs", topicNotifModelSchema);