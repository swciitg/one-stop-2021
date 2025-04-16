import mongoose from "mongoose";
import { allIITGHostelsGC, NotificationCategories, defaultNotifCategoriesMap, allIITGHostels, allIITGMess } from "../helpers/constants.js";

const NotifPrefSchema = new mongoose.Schema({
    "lost": {
        type: Boolean,
        default: true,
        required: true,
    },
    "found": {
        type: Boolean,
        default: true,
        required: true
    },
    "buy": {
        type: Boolean,
        default: true,
        required: true
    },
    "sell": {
        type: Boolean,
        default: true,
        required: true
    },
    "cabSharing": {
        type: Boolean,
        default: true,
        required: true
    },
    "announcement": {
        type: Boolean,
        default: true,
        required: true
    }
});
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
        enum: allIITGHostels
    },
    roomNo: {
        type: String,
        maxLength: 10,
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
        maxLength: 100
    },
    blocked: {
        type: Boolean,
        default: false
    },
    notifPref: {
        type: NotifPrefSchema,
        default: defaultNotifCategoriesMap
    },
    cycleReg: {
        type: String,
        maxLength: 20
    },
    subscribedMess: {
        type: String,
        enum: allIITGMess
    }
});

const onestopUserModel = mongoose.model("onestopUser", userSchema);

export default onestopUserModel; 
