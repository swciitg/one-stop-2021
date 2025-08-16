import mongoose from "mongoose";
import mongooseDouble from "mongoose-double";
import { allIITGHostelsGC } from "../../helpers/constants.js";

mongooseDouble(mongoose);

const hostelOverallStandingsPointsSchema = new mongoose.Schema({
    "hostelName" : {
        type: String,
        required: true,
        enum: allIITGHostelsGC
    },
    "points" : {
        type: mongoose.Schema.Types.Double,
        required: true
    }
});

const spardhaOverallStandingSchema = new mongoose.Schema({
    "event" : {
        type: String,
        required: true
    },
    "category" : {
        type: String,
        enum: ["Men","Women","Men + Women"],
        required: true
    },
    "standings" : {
        type: [hostelOverallStandingsPointsSchema],
        required: true
    },
    "posterEmail" : {
        type: String,
        required: true
    }
});

const spardhaResultsSchema = new mongoose.Schema({
    "hostelName" : {
        type: String,
        required: true,
        enum: allIITGHostelsGC
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
        type: String,
        default: ''
    },
    "results" : {
        type: [[spardhaResultsSchema]]
    },
    "link":{
        type: String,
        required: false
    }
});

const spardhaEventModel = mongoose.model("spardhaEventSchedule", spardhaEventModelSchema);
const spardhaResultModel = mongoose.model("spardhaResults", spardhaResultsSchema);
const spardhaOverallStandingsModel = mongoose.model("spardhaOverallStandingsModel", spardhaOverallStandingSchema);

export { spardhaEventModel, spardhaResultModel, spardhaOverallStandingsModel };
