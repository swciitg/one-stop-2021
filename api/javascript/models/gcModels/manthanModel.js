const mongoose = require("mongoose");
const { allIITGHostels, allIITGWelfareClubs } = require("../../helpers/constants");

const manthanHostelResultSchema = new mongoose.Schema({
    "hostelName": {
        type: String,
        required: true,
        enum: allIITGHostels
    },
    "points": {
        type: mongoose.Schema.Types.Double,
        required: true
    }
});

const manthanEventSchema = new mongoose.Schema({
    "event" : {
        type: String,
        required: true
    },
    "difficulty" : {
        type: String,
        enum: ["Dance","Content Creation","Photography","Literary","Dramatics","Film","Fine Arts","Debating","Culinary"],
        required: true
    },
    "date" : {
        type: Date,
        required: true
    },
    "venue": {
        type: String,
        required: true
    },
    "posterEmail" : {
        type: String,
        required: true,
    },
    "resultAdded" : {
        type: Boolean,
        default: false
    },
    "victoryStatement" : {
        type: String,
        default: ''
    },
    "results" : {
        type: [manthanHostelResultSchema],
        default: []
    }
});

module.exports = {"manthanEventModel" : mongoose.model("manthanEventSchedule",manthanEventSchema)}