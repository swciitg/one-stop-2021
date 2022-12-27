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
    // store all the event names in the array for each competition and admins
    "spardha_events" : {
        type: Array
    },
    "kriti_events" : {
        type: Array
    },
    "manthan_events" : {
        type: Array
    },
    "spardha_admins": {
        type: Array
    },
    "kriti_admins": {
        type: Array
    },
    "manthan_admins": {
        type: Array
    },
    "spardha_board_admins": {
        type: Array
    },
    "kriti_board_admins": {
        type: Array
    },
    "manthan_board_admins": {
        type: Array
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
    "eventDateTime" : {
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
    "results" : {
        type: [[spardhaWinnerSchema]]
    }
});




module.exports = {"spardhaEventModel" : mongoose.model("spardhaEvent",spardhaModelSchema),"gcCompetitionsModel" : mongoose.model("gcEvent",gcCompetitionsSchema),"hostelPointsModel":mongoose.model("hostelPoint",hostelPointsSchema), "spardhaWinnerModel":mongoose.model("spardhaWinner",spardhaWinnerSchema)};

