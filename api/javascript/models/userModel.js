const mongoose = require("mongoose");
const { allIITGHostelsGC, NotificationCategories, defaultNotifCategoriesMap, allIITGHostels } = require("../helpers/constants");

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
        type: Map,
        of: Boolean,
        default: defaultNotifCategoriesMap,
        validate: {
            validator: function(m) {
                let keys=Array.from(m.keys());
                console.log(keys);
                console.log(typeof(m),typeof(defaultNotifCategoriesMap));
                let defaultKeys=Object.keys(defaultNotifCategoriesMap);
                console.log(keys,defaultKeys);
                return keys.length===defaultKeys.length && keys.every((e,i) => e===defaultKeys[i]);
            },
            message: props => "NOt valid notif categories"
        }
    }
});

module.exports = mongoose.model("onestopUser", userSchema);
