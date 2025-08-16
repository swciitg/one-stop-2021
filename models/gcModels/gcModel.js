import mongoose from 'mongoose';
import mongooseDouble from 'mongoose-double';
mongooseDouble(mongoose);

const gcHostelWisePointsSchema = new mongoose.Schema({
    "hostelName": {
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
    },
    "sahyog_points": {
        type: mongoose.Schema.Types.Double,
        default: 0
    }
});

const gcCompetitionsStoreSchema = new mongoose.Schema({
    // store all the event names, overall gc points, admins emails for gc
    "overallGcStandings": {
        type: [gcHostelWisePointsSchema],
        default: []
    },
    "spardha_events": {
        type: Array,
        default: []
    },
    "kriti_events": {
        type: Array,
        default: []
    },
    "manthan_events": {
        type: Array,
        default: []
    },
    "sahyog_events": {
        type: Array,
        default: []
    },
    "spardha_admins": {
        type: Array,
        default: []
    },
    "kriti_admins": {
        type: Array,
        default: []
    },
    "manthan_admins": {
        type: Array,
        default: []
    },
    "sahyog_admins": {
        type: Array,
        default: []
    },
    "spardha_board_admins": {
        type: Array,
        default: []
    },
    "kriti_board_admins": {
        type: Array,
        default: []
    },
    "manthan_board_admins": {
        type: Array,
        default: []
    },
    "sahyog_board_admins": {
        type: Array,
        default: []
    }
});

export const gcCompetitionsStoreModel = mongoose.model("gcCompetitionsStore", gcCompetitionsStoreSchema);
export const gcHostelWisePoints = mongoose.model("gcOverallHostelWisePoints", gcHostelWisePointsSchema);