const mongoose = require("mongoose");
const { sendToDevice } = require("../controllers/notificationController");
const userModel = require("./userModel");

const userPersonalNotifSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
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
},{timestamps: true});

module.exports = mongoose.model("userPersonalNotifs",userPersonalNotifSchema);