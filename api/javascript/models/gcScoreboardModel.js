const mongoose = require("mongoose");

const hostelPointsSchema = new mongoose.Schema({
    "name" : {
        type: String,
        required: true
    },
    "spardha_points": {
        type: Number,
        required: true
    },
    "kriti_points": {
        type: Number,
        required: true
    },
    "manthan_points": {
        type: Number,
        required: true
    }
});

const gcCompetitionsSchema = new mongoose.Schema({
    // store all the event names in the array for each competition
    "spardha_events" : {
        type: Array,
        required: true
    },
    "kriti_events" : {
        type: Array,
        required: true
    },
    "manthan_events" : {
        type: Array,
        required: true
    }
});

const spardhaModelSchema = new mongoose.Schema({
    "event" : {
        type: String,
        required: true
    },
    "stage" : {
        type: String,
        enum: ["Qualifiers","Quater-Final","Semi-Final","Final"]
    },
    "category": {
        type: String,
        enum: ["Men","Women","Men + Women"]
    },
    "posterEmail": {
        type: String, 
        required: true
    },
    "date": {
        type: Date,
        required: true
    },
    "status": {
        type: String,
        required: true,
        enum: ["ok","cancelled","postponed"]
    },
    "venue": {
        type: String,
        required: true
    },
    "hostels" : {
        type: Array,
        required: true
    },
    "resultAdded" : {
        type: Boolean,
        default: false
    },
    "winners" : {
        type: [[spardhaWinnerSchema]]
    }
});

const spardhaWinnerSchema = new mongoose.Schema({
    "name" : {
        type: String,
        required: true
    },
    "points" : {
        type: Number,
        required: true
    },
    "primaryScore" : {
        type: String,
        required: true
    },
    "secondaryScore" : {
        type: String
    }
});


module.exports = {"spardhaScoreModel" : mongoose.model(spardhaModelSchema),"gcEventsModel" : mongoose.model(gcCompetitionsSchema),"hostelPointsModel":mongoose.model(hostelPointsSchema)};

