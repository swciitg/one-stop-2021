const mongoose = require("mongoose");
const { allIITGHostels } = require("../helpers/constants");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    outlook_email: {
        type: String,
        required: true
    },
    altEmail: {
        type: String,
        default: ''
    },
    rollNo: {
        type: String,
        required: true
    },
    dob: {
        type: Date
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"],
    },
    hostel: {
        type: String,
        enum: allIITGHostels,
    },
    roomNo: {
        type: String,
    },
    homeAddress: {
        type: String,
    },
    phoneNumber: {
        type: Number,
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
