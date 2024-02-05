const mongoose = require("mongoose");

const quickLink = new mongoose.Schema({
    priorityNumber : { type: Number, required : true},
    title : { type: String, required : true},
    logo : { type: String, required : true},
    url : { type: String, required : true},
});

const homePage = new mongoose.Schema({
    id : { type: String},
    s3Key : { type: String},
    bucket : { type: String},
    mime : { type: String},
    comment : { type: String },
    ratio : { type: Number, required : true},
    quickLinks : [quickLink]
});

module.exports = mongoose.model("homePage", homePage);