const mongoose = require("mongoose");
require('mongoose-double')(mongoose);

const gcHostelWisePointsSchema = new mongoose.Schema({
    "hostelName" : {
        type: String,
        required: true
    },
    "spardha_points": {
        type: mongoose.Schema.Types.Double,
        default: 0
    },
    "kriti_points": {
        type: mongoose.Schema.Types.Double,
        default: 0
    },
    "manthan_points": {
        type: mongoose.Schema.Types.Double,
        default: 0
    }
});

const gcCompetitionsStoreSchema = new mongoose.Schema({
    // store all the event names, overall gc points, admins emails for gc
    "overallGcStandings" : {
        type: [gcHostelWisePointsSchema],
        default:[]
    },
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

module.exports = {"gcCompetitionsStoreModel" : mongoose.model("gcCompetitionsStore",gcCompetitionsStoreSchema),"gcHostelWisePoints" : mongoose.model("gcOverallHostelWisePoints",gcHostelWisePointsSchema)};