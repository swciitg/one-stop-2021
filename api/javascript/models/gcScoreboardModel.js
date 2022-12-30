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

const gcCompetitionsStoreSchema = new mongoose.Schema({
    // store all the event names in the array for each competition and admins
    "spardha_events" : {
        type: Array,
        default:[]
    },
    "kriti_events" : {
        type: Array,
        default:[]
    },
    "manthan_events" : {
        type: Array,
        default:[]
    },
    "spardha_admins": {
        type: Array,
        default:[]
    },
    "kriti_admins": {
        type: Array,
        default:[]
    },
    "manthan_admins": {
        type: Array,
        default:[]
    },
    "spardha_board_admins": {
        type: Array,
        default:[]
    },
    "kriti_board_admins": {
        type: Array,
        default:[]
    },
    "manthan_board_admins": {
        type: Array,
        default:[]
    }
});

const spardhaResultsSchema = new mongoose.Schema({
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

const spardhaEventModelSchema = new mongoose.Schema({
    "event" : {
        type: String,
        required: true
    },
    "stage" : {
        type: String,
        enum: ["Qualifiers","Quater-Finals","Semi-Finals","Finals","3rd vs 4th"],
        required: true
    },
    "category": {
        type: String,
        enum: ["Men","Women","Men + Women"],
        required: true
    },
    "posterEmail": {
        type: String, 
        required: true
    },
    "date" : {
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
    "victoryStatement" : {
        type: String
    },
    "results" : {
        type: [[spardhaResultsSchema]]
    }
});




module.exports = {"spardhaEventModel" : mongoose.model("spardhaEventSchedule",spardhaEventModelSchema),"gcCompetitionsStoreModel" : mongoose.model("gcCompetitionsStore",gcCompetitionsStoreSchema),"hostelPointsModel":mongoose.model("hostelPoint",hostelPointsSchema), "spardhaResultsModel":mongoose.model("spardhaResults",spardhaResultsSchema)};

