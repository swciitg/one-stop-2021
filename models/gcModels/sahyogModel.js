import mongoose from "mongoose";
import { allIITGHostelsGC, allIITGWelfareClubs } from "../../helpers/constants.js";

const sahyogHostelResultSchema = new mongoose.Schema({
    "hostelName": {
        type: String,
        required: true,
        enum: allIITGHostelsGC
    },
    "points": {
        type: mongoose.Schema.Types.Double,
        required: true
    }
});

const sahyogEventSchema = new mongoose.Schema({
    "event" : {
        type: String,
        required: true
    },
    "difficulty" : {
        type: String,
        enum: ["High","Mid","Low"],
        required: true
    },
    "points": {
        type: mongoose.Schema.Types.Double,
    },
    "date" : {
        type: Date,
        required: true
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
                if(allIITGWelfareClubs.includes(element) === false){
                    throw new Error("Some clubs not in welfare clubs list")
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
    "problemLink" : {
        type: String,
        required: true,
    },
    "link":{
        type: String,
        required: false
    },
    "results" : {
        type: [sahyogHostelResultSchema],
        default: [],
        validate: function(results){
            let set = new Set();
            results.forEach((element) => set.add(element["hostelName"]));
            if(set.size !== results.length) throw new Error("Some hostel is added more than once in list");
        }
    }
});

sahyogEventSchema.pre('save',function(){
    if(this.difficulty === 'High'){
        this.points = 500;
    }
    else if(this.difficulty === 'Mid'){
        this.points = 350;
    }
    else this.points = 200;
});

export const sahyogEventModel = mongoose.model("sahyogEventSchedule", sahyogEventSchema);
