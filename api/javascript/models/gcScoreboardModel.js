const mongoose = require("mongoose");

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
        type: String,
        required: true
    },
    "time": {
        type: String,
        required: true
    },
    "venue": {
        type: String,
        required: true
    },
    "matchType": {
        type: String,
        enum: ["One-One","Many-One"]
    },
    "participatingHostels" : {
        type: Array,
        required: true
    },
    "result_added" : {
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


module.exports = {"spardhaScoreModel" : mongoose.model(spardhaModelSchema)}

