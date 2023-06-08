const mongoose = require("mongoose");
const { allIITGHostels } = require("../helpers/constants");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    deviceTokens: {
        type: [String],
        default: [],
    },
    outlook_email: {
        type: String,
        required: true
    },
    alt_email: {
        type: String,
        required: true
    },
    rollNo: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
        required: true
    },
    hostel: {
        type: String,
        enum: allIITGHostels,
        required: true
    },
    roomNo: {
        type: String,
        required: true
    },
    permanentAddress: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        min: [1000000000, "Invalid mobile number."],
        max: [9999999999, "Invalid mobile number."],
    },
    emergencyPhoneNumber: {
        type: Number,
        min: [1000000000, "Invalid mobile number."],
        max: [9999999999, "Invalid mobile number."],
    },
    deviceIDs: [String]
});

module.exports = mongoose.model("onestopUser", userSchema);
