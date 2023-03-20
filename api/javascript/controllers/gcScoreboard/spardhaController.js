const { getGcScoreboardStore, checkIfAdmin, checkIfBoardAdmin, ifValidEvent } = require("../../helpers/gcScoreboardHelpers");
const { spardhaEventModel, spardhaOverallStandingsModel} = require("../../models/gcModels/spardhaModel");
const mongoose = require("mongoose");
const {totalSpardhaWomenPoints, allIITGWomenHostels, totalKritiPoints, totalSpardhaMenPoints, totalSahyogPoints, totalManthanPoints } = require("../../helpers/constants");
require('mongoose-double')(mongoose);

async function ifAuthorizedForSpardhaEventSchedules(eventId, email){
    let spardhaEventSchedule = await spardhaEventModel.findById(eventId);
    if(spardhaEventSchedule["posterEmail"] !== email && await checkIfBoardAdmin(email,"spardha")===false){
        return false;
    }
    return true;
}

async function ifAuthorizedForSpardhaStandings(eventId, email){
    let spardhaStanding = await spardhaOverallStandingsModel.findById(eventId);
    if(spardhaStanding["posterEmail"] !== email && await checkIfBoardAdmin(email,"spardha")===false){
        return false;
    }
    return true;
}

exports.postSpardhaEvents= async (req, res) => {
    try {
        let spardhaEvents = req.body.events;
        if(spardhaEvents===undefined){
            res.status(400).json({ "success": false, "message": "Not valid parameters in request"});
            return;
        }
        const gcScoreboardStore = await getGcScoreboardStore();
        gcScoreboardStore.spardha_events = spardhaEvents;
        await gcScoreboardStore.save();
        res.json({"success" : true, "message" : "Spardha events posted successfully","details" : gcScoreboardStore.spardha_events});
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.getSpardhaEvents = async (req,res) => {
    try{
        let gcCompetitionsStore = await getGcScoreboardStore();
        res.json({"success" : true, "details" : gcCompetitionsStore.spardha_events});
    }
    catch(err){
        res.status(500).json({"success" : false,"message" : err.toString()});
    }
}

exports.getSpardhaEventsSchdedules = async (req, res) => {
    try{
        // console.log(typeof(req.query.forAdmin));
        // console.log(req.body.email);
        console.log(await checkIfAdmin(req.body.email,"spardha"), await checkIfBoardAdmin(req.body.email,"spardha"));
        let filters = {"resultAdded" : false}; // filters for event schedules
        if(req.query.forAdmin==="true" && await checkIfBoardAdmin(req.body.email,"spardha")===false){
            filters["posterEmail"]=req.body.email;
        }
        console.log(filters);
        const eventschedules = await spardhaEventModel.find(filters).sort({ "date": 1 }); // send all event schedules if no email passed or passed email belongs to board admin
        res.status(200).json({ "success": true, "details": eventschedules });
    }
    catch(err){
        res.status(500).json({ "success": false, "message" : err.toString() });
    }
};

exports.postSpardhaEventSchedule = async (req, res) => {
    try {
        if(await ifValidEvent(req.body.event,"spardha")===false){
            res.status(406).json({ "success": false, "message": "Event not in list of spardha events"});
            return;
        }
        req.body.hostels.sort(); // sort hostel list
        if((await spardhaEventModel.find({"event" : req.body.event,"category" : req.body.category,"stage":req.body.stage,"hostels":req.body.hostels})).length!==0){
            res.status(406).json({ "success": false, "message" : "Schedule already added for these details"});
            return;
        }
        req.body.date = new Date(req.body.date);
        req.body.posterEmail = req.body.email;
        let spardhaEvent = new spardhaEventModel(req.body);
        await spardhaEvent.save();
        res.json({ "success": true });
    }
    catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
};

exports.getGcOverallStandings = async (req,res) => {
    try{
        let gcCompetitionsStore = await getGcScoreboardStore();
        let gcStandings = [];
        gcCompetitionsStore["overallGcStandings"].forEach((hostelGcPoints) => {
            let totalPoints;
            // for different total points for men, women in spardha
            if(allIITGWomenHostels.includes(hostelGcPoints["hostelName"])){
                totalPoints = Math.round(((hostelGcPoints["spardha_points"]*30)/totalSpardhaWomenPoints + (hostelGcPoints["kriti_points"]*30)/totalKritiPoints + (hostelGcPoints["manthan_points"]*30)/totalManthanPoints + (hostelGcPoints["sahyog_points"]*10)/totalSahyogPoints) * 100) / 100;
            }
            else totalPoints = Math.round(((hostelGcPoints["spardha_points"]*30)/totalSpardhaMenPoints + (hostelGcPoints["kriti_points"]*30)/totalKritiPoints + (hostelGcPoints["manthan_points"]*30)/totalManthanPoints + (hostelGcPoints["sahyog_points"]*10)/totalSahyogPoints) * 100) / 100;
            gcStandings.push({"hostelName" : hostelGcPoints["hostelName"],"points" : totalPoints});
        });
        res.json({"success" : true,"details" : gcStandings});
    }
    catch(err){
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.getSpardhaOverallStandings = async (req,res) => {
    try{
        let gcCompetitionsStore = await getGcScoreboardStore();
        let gcStandings = [];
        gcCompetitionsStore["overallGcStandings"].forEach((hostelGcPoints) => {
            console.log(hostelGcPoints);
            let roundedPoints = Math.round( hostelGcPoints["spardha_points"] * 100) / 100;
            gcStandings.push({"hostelName" : hostelGcPoints["hostelName"],"points" : roundedPoints});
        });
        res.json({"success" : true,"details" : gcStandings});
    }
    catch(err){
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.getSpardhaEventStandings = async (req,res) => {
    try{
        let eventsGcStandings = await spardhaOverallStandingsModel.find();
        if(await checkIfAdmin(req.body.email,"spardha")){
            eventsGcStandings = eventsGcStandings.filter((eventStanding) => eventStanding["posterEmail"]===req.body.email);
        }
        res.json({"success" : true,"details" : eventsGcStandings});
    }
    catch(err){
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.postSpardhaOverallStandings = async (req, res) => {
    try {
        req.body.posterEmail = req.body.email;
        if(await ifValidEvent(req.body.event,"spardha")===false){
            res.status(406).json({ "success": false, "message": "Event not in list of spardha events"});
            return;
        }
        if((await spardhaOverallStandingsModel.find({"event" : req.body.event,"category" : req.body.category})).length!==0){
            res.status(406).json({ "success": false, "message": "Standings already added for this event & category"});
            return;
        }
        let spardhaOverallStandingEvent = spardhaOverallStandingsModel(req.body);
        console.log(spardhaOverallStandingEvent);
        await spardhaOverallStandingEvent.save();
        let gcCompetitionsStore = await getGcScoreboardStore();
        req.body.standings.forEach((hostelOverallStanding) => {
            gcCompetitionsStore["overallGcStandings"].forEach((hostelGcPoints) => {
                if(hostelGcPoints["hostelName"]===hostelOverallStanding["hostelName"]){
                    // console.log(parseFloat(hostelGcPoints["spardha_points"].toString()));
                    hostelGcPoints["spardha_points"]+=hostelOverallStanding["points"];
                }
            });
        });
        await gcCompetitionsStore.save();
        res.json({"success" : true,"details" : spardhaOverallStandingEvent});
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.updateSpardhaOverallStanding = async (req,res) => {
    try{
        let id = req.params.id;
        if(await ifAuthorizedForSpardhaStandings(id,req.body.email)===false){
            res.status(403).json({ "success": false, "message": "You are not authorized admin"});
            return;
        }
        let spardhaOverallStandingEvent = await spardhaOverallStandingsModel.findById(id);
        req.body.posterEmail = spardhaOverallStandingEvent.posterEmail;
        let sameStandings = await spardhaOverallStandingsModel.find({"event" : req.body.event,"category" : req.body.category});
        if(!(req.body.event===spardhaOverallStandingEvent["event"] && req.body.category===spardhaOverallStandingEvent["category"]) && sameStandings.length!==0){
            res.status(406).json({ "success": false, "message": "Standings already added for this event & category"});
            return;
        }
        let gcCompetitionsStore = await getGcScoreboardStore();
        req.body.standings.forEach((hostelOverallStanding) => {
            gcCompetitionsStore["overallGcStandings"].forEach((hostelGcPoints) => {
                if(hostelGcPoints["hostelName"]===hostelOverallStanding["hostelName"]){
                    hostelGcPoints["spardha_points"]+=hostelOverallStanding["points"];
                }
            });
        });
        spardhaOverallStandingEvent["standings"].forEach((hostelOverallStanding) => {
            gcCompetitionsStore["overallGcStandings"].forEach((hostelGcPoints) => {
                if(hostelGcPoints["hostelName"]===hostelOverallStanding["hostelName"]){
                    hostelGcPoints["spardha_points"]-=hostelOverallStanding["points"]; // subtract old points
                }
            });
        });
        console.log(req.body);
        await spardhaOverallStandingsModel.findOneAndUpdate({_id : id},req.body,{runValidators: true});
        await gcCompetitionsStore.save();
        res.json({"success" : true,"details" : await spardhaOverallStandingsModel.findById(id)});
    }
    catch(err){
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.deleteSpardhaStanding = async (req,res) => {
    try {
        const id = req.params.id;
        if(await ifAuthorizedForSpardhaStandings(id,req.body.email)===false){
            res.status(403).json({ "success": false, "message": "You are not authorized admin"});
            return;
        }
        let spardhaOverallStandingEvent = await spardhaOverallStandingsModel.findById(id);
        let gcCompetitionsStore = await getGcScoreboardStore();
        spardhaOverallStandingEvent["standings"].forEach((hostelOverallStanding) => {
            gcCompetitionsStore["overallGcStandings"].forEach((hostelGcPoints) => {
                if(hostelGcPoints["hostelName"]===hostelOverallStanding["hostelName"]){
                    hostelGcPoints["spardha_points"]-=hostelOverallStanding["points"]; // subtract old points
                }
            });
        });
        await gcCompetitionsStore.save();
        await spardhaOverallStandingsModel.findByIdAndDelete(id);
        res.json({ "success": true, "message": "Spardha standing delete successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.updateSpardhaEventSchedule = async (req, res) => { // this is used for updation
    try {
        const id = req.params.id;
        console.log(req.body.email,id);
        if(await ifAuthorizedForSpardhaEventSchedules(id,req.body.email)===false){
            res.status(403).json({ "success": false, "message": "You are not authorized admin"});
            return;
        }
        let spardhaEventSchedule = await spardhaEventModel.findById(id);
        req.body.posterEmail = spardhaEventSchedule.posterEmail;
        req.body.hostels.sort();
        let sameEvents = await spardhaEventModel.find({"event" : req.body.event,"category" : req.body.category,"stage":req.body.stage,"hostels":req.body.hostels});
        let sameHostels=false;
        if(spardhaEventSchedule["hostels"].length===req.body.hostels.length){
            sameHostels=true;
            for(let i=0;i<spardhaEventSchedule["hostels"].length;i++){
                if(spardhaEventSchedule["hostels"][i]!==req.body.hostels[i]){
                    sameHostels=false;
                    break;
                }
            }
        }
        console.log(spardhaEventSchedule["event"]===req.body.event,spardhaEventSchedule["category"]===req.body.category,spardhaEventSchedule["stage"]===req.body.stage,sameHostels);
        console.log(!(spardhaEventSchedule["event"]===req.body.event && spardhaEventSchedule["category"]===req.body.category && spardhaEventSchedule["stage"]===req.body.stage && spardhaEventSchedule["hostels"]===req.body.hostels));
        if(!(spardhaEventSchedule["event"]===req.body.event && spardhaEventSchedule["category"]===req.body.category && spardhaEventSchedule["stage"]===req.body.stage && sameHostels) && sameEvents.length!==0){
            res.status(406).json({ "success": false, "message" : "Schedule already added for these details"});
            return;
        }
        await spardhaEventModel.findOneAndUpdate({_id : id},req.body,{runValidators: true});
        res.json({ "success": true, "message": "Spardha event updated successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.deleteAnEventSchedule = async (req, res) => {
    try {
        const id = req.params.id;
        let spardhaEventSchedule = await spardhaEventModel.findById(id);
        if(await ifAuthorizedForSpardhaEventSchedules(id,req.body.email)===false){
            res.status(403).json({ "success": false, "message": "You are not authorized admin"});
            return;
        }
        await spardhaEventModel.findByIdAndDelete(id);
        res.json({ "success": true, "message": "Spardha event deleted successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.getSpardhaResults = async (req,res) => {
    try{
        console.log(await checkIfAdmin(req.body.email,"spardha"), await checkIfBoardAdmin(req.body.email,"spardha"));
        let filters = {"resultAdded" : true}; // filters for event schedules
        if(req.query.forAdmin==="true" && await checkIfBoardAdmin(req.body.email,"spardha")===false){
            filters["posterEmail"]=req.body.email;
        }
        console.log(filters);
        const events = await spardhaEventModel.find(filters).sort({ "date": -1 }); // send all event schedules if no email passed or passed email belongs to board admin
        res.status(200).json({ "success": true, "details": events });
    }
    catch(err){
        res.status(500).json({ "success": false, "message" : err.toString() });
    }
}

exports.addSpardhaEventResult = async (req,res) => { // for result added and updation
    try{
        const id = req.params.id;
        if(await ifAuthorizedForSpardhaEventSchedules(id,req.body.email)===false){
            res.status(403).json({ "success": false, "message": "You are not authorized admin"});
            return;
        }
        console.log(req.body.results);
        req.body.resultAdded=true;
        await spardhaEventModel.findOneAndUpdate({_id : id},req.body,{runValidators: true});
        console.log((await spardhaEventModel.findById(id)));
        res.json({ "success": true, "message": "Spardha event result added successfully" });
    }
    catch(err){
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.deleteSpardhaEventResult = async (req,res) => {
    try{
        const id = req.params.id;
        console.log(id);
        let spardhaEventSchedule = await spardhaEventModel.findById(id);
        console.log(spardhaEventSchedule);
        if(await ifAuthorizedForSpardhaEventSchedules(id,req.body.email)===false){
            res.status(403).json({ "success": false, "message": "You are not authorized admin"});
            return;
        }
        spardhaEventSchedule["resultAdded"]=false;
        spardhaEventSchedule["victoryStatement"]='';
        spardhaEventSchedule["results"]=[];
        await spardhaEventSchedule.save();
        res.json({ "success": true, "message": "Spardha event result deleted successfully" });
    }
    catch(err){
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}
