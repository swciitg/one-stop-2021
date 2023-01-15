const mongoose = require("mongoose");
const { allIITGHostels } = require("../../helpers/constants");

const clubSchema = new mongoose.Schema({
    "name" : {
        type: String,
        enum: ["Coding Club","CnA Club","E-Cell","Robotics Club"]
    }
});

const difficultySchema = new mongoose.Schema({
    "problemType" : {
        type: String,
        enum: ["High","Mid","Low"],
        required: true
    },
    "points" : {
        type: Number,
        set: () => {
            if(this.problemType === 'High'){
                return 400;
            }
            else if(this.problemType === 'Mid'){
                return 250;
            }
            return 200;
        }
    }
});

const kritiHostelResultSchema = new mongoose.Schema({
    "hostelName": {
        type: String,
        required: true,
        enum: allIITGHostels
    },
    "points": {
        type: Number,
        required: true
    }
});

const kritiEventSchema = new mongoose.Schema({
    "event" : {
        type: String,
        required: true
    },
    "cup" : {
        type: String,
        required: true,
        enum: ["Brainiac Cup","Astro Cup","Business Cup"]
    },
    "startDate" : {
        type: Date,
        required: true
    },
    "startTime" : {
        type: Date,
        required: true
    },
    "endTime" : {
        type: Date,
        required: true
    },
    "isScheduled" : {
        type: Boolean,
        default: true
    },
    "venue": {
        type: String,
        required: true
    },
    "clubs": {
        type: [clubSchema],
        required: true,
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
    "difficulty" : {
        type: difficultySchema,
        required: true
    },
    "results" : {
        type: [kritiHostelResultSchema],
        default: []
    }
});

module.exports = {"kritiEventModel" : mongoose.model("kritiEventSchedule",kritiEventSchema)}
