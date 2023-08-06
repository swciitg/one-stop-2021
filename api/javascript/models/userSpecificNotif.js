const mongoose = require("mongoose");

let userSpecificNotifSchema = new mongoose.Schema({
    userid: {
        type: String,
        required: true
    },
    notifHeader: 
},{timestamps: true});