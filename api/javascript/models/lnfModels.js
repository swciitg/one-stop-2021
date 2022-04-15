const mongoose = require("mongoose");

const lnfDetailsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, required: true },
    category: { type: String, required: true },
    location: { type: String, required: true },
    phonenumber: { type: String, required: true },
    description: { type: String, required: true },
    link: { type: String, required: true },
    creation: { type: Date, default: Date.now },
    
});

module.exports = mongoose.model("lnfDetails", lnfDetailsSchema);
