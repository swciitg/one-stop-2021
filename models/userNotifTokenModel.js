import mongoose from "mongoose";

const userNotifTokenSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true,
        unique: true
    },
    deviceToken: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model("userNotifTokens", userNotifTokenSchema);