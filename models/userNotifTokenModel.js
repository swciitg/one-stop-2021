const mongoose = require("mongoose");

const userNotifTokenSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
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

module.exports = mongoose.model("userNotifTokens",userNotifTokenSchema);