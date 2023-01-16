const mongoose = require("mongoose");
const { allIITGHostels, allIITGTechClubs } = require("../../helpers/constants");

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
    "difficulty" : {
        type: String,
        enum: ["High","Mid","Low"],
        required: true
    },
    "points": {
        type: Number
    },
    "startDate" : {
        type: Date,
        required: true
    },
    "endDate" : {
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
        type: [String],
        required: true,
        validate: function(clubNames){
            clubNames.forEach(element => {
                if(allIITGTechClubs.includes(element) === false){
                    throw new Error("Not in tech clubs list")
                }
            });
        }
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
        type: [kritiHostelResultSchema],
        default: [],
        validate: function(results){
            let set = new Set();
            results.forEach((element) => set.add(element["hostelName"]));
            if(set.size !== results.length) throw new Error("Some hostel is added twice in list");
        }
    }
});

kritiEventSchema.pre('save',function(){
    console.log("setting points");
    if(this.difficulty === 'High'){
        this.points = 400;
    }
    else if(this.difficulty === 'Mid'){
        this.points = 250;
    }
    else this.points = 200;
});

module.exports = {"kritiEventModel" : mongoose.model("kritiEventSchedule",kritiEventSchema)}
