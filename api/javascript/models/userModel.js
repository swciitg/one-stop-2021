const mongoose = require("mongoose");
const { allIITGHostels } = require("../helpers/constants");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    outlookEmail: {
        type: String,
        required: true
    },
    altEmail: {
        type: String,
    },
    rollNo: {
        type: String,
        required: true
    },
    dob: {
        type: Date,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Others"]
    },
    hostel: {
        type: String,
        enum: allIITGHostels,
    },
    roomNo: {
        type: String,
        maxLength: 5,
    },
    homeAddress: {
        type: String,
        maxLength: 400,
    },
    phoneNumber: {
        type: Number,
        min: [1000000000, "Invalid mobile number."],
        max: [9999999999, "Invalid mobile number."],
    },
    emergencyPhoneNumber: {
        type: Number,
        min: [1000000000, "Invalid mobile number."],
        max: [9999999999, "Invalid mobile number."]
    },
    linkedin: {
        type: String,
        maxLength: 50
    }
});

module.exports = mongoose.model("onestopUser", userSchema);
