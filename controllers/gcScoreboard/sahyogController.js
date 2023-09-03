const { getGcScoreboardStore, checkIfAdmin, checkIfBoardAdmin, ifValidEvent } = require("../../helpers/gcScoreboardHelpers");
const { sahyogEventModel } = require("../../models/gcModels/sahyogModel");

async function ifAuthorizedForSahyogEventSchedules(eventId, email){
    let sahyogEventSchedule = await sahyogEventModel.findById(eventId);
    if(sahyogEventSchedule["posterEmail"] !== email && await checkIfBoardAdmin(email,"sahyog")===false){
        return false;
    }
    return true;
}


exports.getSahyogEvents = async (req,res) => {
    try{
        let gcCompetitionsStore = await getGcScoreboardStore();
        res.json({"success" : true, "details" : gcCompetitionsStore.sahyog_events});
    }
    catch(err){
        res.status(500).json({"success" : false,"message" : err.toString()});
    }
}

exports.postSahyogEvents= async (req, res) => {
    try {
        let sahyogEvents = req.body.events;
        if(sahyogEvents===undefined){
            res.status(400).json({ "success": false, "message": "Not valid parameters in request"});
            return;
        }
        const gcScoreboardStore = await getGcScoreboardStore();
        gcScoreboardStore.sahyog_events = sahyogEvents;
        await gcScoreboardStore.save();
        res.json({"success" : true, "message" : "sahyog events posted successfully","details" : gcScoreboardStore.sahyog_events});
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.getSahyogOverallStandings = async (req,res) => {
    try{
        let gcCompetitionsStore = await getGcScoreboardStore();
        let gcStandings = [];
        gcCompetitionsStore["overallGcStandings"].forEach((hostelGcPoints) => {
            console.log(hostelGcPoints);
            let roundedPoints = Math.round( hostelGcPoints["sahyog_points"] * 100) / 100;
            gcStandings.push({"hostelName" : hostelGcPoints["hostelName"],"points" : roundedPoints});
        });
        res.json({"success" : true,"details" : gcStandings});
    }
    catch(err){
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.getSahyogEventStandings = async (req,res) => {
    try{
        let eventsSchedules = await sahyogEventModel.find({"resultAdded" : true});
        res.json({"success" : true,"details" : eventsSchedules});
    }
    catch(err){
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}


exports.postSahyogEventSchedule = async (req,res) => {
    try{
        req.body.posterEmail = req.body.email;
        console.log("here 0");
        console.log(req.body);
        console.log("vsdfds");
        if(await ifValidEvent(req.body.event,"sahyog")===false){
            res.status(406).json({ "success": false, "message": "Event not in list of sahyog events"});
            return;
        }
        console.log("gdfsgsdf");
        if((await sahyogEventModel.find({"event" : req.body.event})).length!==0){
            res.status(406).json({ "success": false, "message" : "Schedule already added for these details"});
            return;
        }
        console.log(req.body);
        console.log("here 1");
        await sahyogEventModel(req.body).save();
        console.log("here 2");
        res.json({"success" : true, "message" : "sahyog event schedule posted successfully"});
    }
    catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.getSahyogEventsSchdedules = async (req, res) => {
    try{
        console.log(await checkIfAdmin(req.body.email,"sahyog"), await checkIfBoardAdmin(req.body.email,"sahyog"));
        let filters = {"resultAdded" : false}; // filters for event schedules
        if(req.query.forAdmin==="true" && await checkIfBoardAdmin(req.body.email,"sahyog")===false){
            filters["posterEmail"]=req.body.email;
        }
        console.log(filters);
        const events = await sahyogEventModel.find(filters).sort({ "date": 1 }); // send all event schedules if no email passed or passed email belongs to board admin
        res.status(200).json({ "success": true, "details": events });
    }
    catch(err){
        res.status(500).json({ "success": false, "message" : err.toString() });
    }
};

exports.updateSahyogEventSchedule = async (req, res) => { // this is used for result posting and updation
    try {
        const id = req.params.id;
        console.log(req.body.email,id);
        if(await ifAuthorizedForSahyogEventSchedules(id,req.body.email)===false){
            res.status(403).json({ "success": false, "message": "You are not authorized admin"});
            return;
        }
        let sameSahyogEvents = await sahyogEventModel.find({"event" : req.body.event});
        if(sameSahyogEvents.length!==0 && sameSahyogEvents[0]["_id"].toString()!==id && sameSahyogEvents[0]["event"]===req.body.event){
            res.status(406).json({ "success": false, "message" : "Schedule already added for these details"});
            return;
        }
        let sahyogEventSchedule = await sahyogEventModel.findById(id);
        req.body.posterEmail = sahyogEventSchedule.posterEmail;
        req.body.clubs.sort();
        let sameEvents = await sahyogEventModel.find({"event" : req.body.event});
        console.log(sameEvents);
        if(!(sahyogEventSchedule["event"]===req.body.event) && sameEvents.length!==0){
            res.status(406).json({ "success": false, "message" : "Schedule already added for these details"});
            return;
        }
        await sahyogEventModel.findOneAndUpdate({_id : id},req.body,{runValidators: true});
        res.json({ "success": true, "message": "sahyog event updated successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.addSahyogEventResult = async (req,res) => { // for result added and updation
    try{
        const id = req.params.id;
        let sahyogEventSchedule = await sahyogEventModel.findById(id);
        if(await ifAuthorizedForSahyogEventSchedules(id,req.body.email)===false){
            res.status(403).json({ "success": false, "message": "You are not authorized admin"});
            return;
        }
        console.log(req.body.results);
        req.body.resultAdded=true;
        await sahyogEventModel.findOneAndUpdate({_id : id},req.body,{runValidators: true});
        let gcCompetitionsStore = await getGcScoreboardStore();
        for(let i=0;i<sahyogEventSchedule["results"].length;i++){
            for(let j=0;j<gcCompetitionsStore["overallGcStandings"].length;j++){
                if(sahyogEventSchedule["results"][i]["hostelName"] === gcCompetitionsStore["overallGcStandings"][j]["hostelName"]){
                    // hostel found in gc competitions store
                    gcCompetitionsStore["overallGcStandings"][j]["sahyog_points"]-=sahyogEventSchedule["results"][i]["points"];// subtract old points
                }
            }
        }
        for(let i=0;i<req.body["results"].length;i++){
            for(let j=0;j<gcCompetitionsStore["overallGcStandings"].length;j++){
                if(req.body["results"][i]["hostelName"] === gcCompetitionsStore["overallGcStandings"][j]["hostelName"]){
                    // hostel found in gc competitions store
                    gcCompetitionsStore["overallGcStandings"][j]["sahyog_points"]+=req.body["results"][i]["points"]; // add new points
                }
            }
        }
        await gcCompetitionsStore.save();
        console.log((await sahyogEventModel.findById(id)));
        res.json({ "success": true, "message": "sahyog event result added successfully" });
    }
    catch(err){
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.deleteSahyogEventSchedule = async (req, res) => {
    try {
        const id = req.params.id;
        if(await ifAuthorizedForSahyogEventSchedules(id,req.body.email)===false){
            res.status(403).json({ "success": false, "message": "You are not authorized admin"});
            return;
        }
        await sahyogEventModel.findByIdAndDelete(id);
        res.json({ "success": true, "message": "sahyog event deleted successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

exports.getSahyogResults = async (req,res) => {
    try{
        console.log(await checkIfAdmin(req.body.email,"sahyog"), await checkIfBoardAdmin(req.body.email,"sahyog"));
        let filters = {"resultAdded" : true}; // filters for event schedules
        if(req.query.forAdmin==="true" && await checkIfBoardAdmin(req.body.email,"sahyog")===false){
            filters["posterEmail"]=req.body.email;
        }
        console.log(filters);
        const events = await sahyogEventModel.find(filters).sort({ "date": -1 }); // send all event schedules if no email passed or passed email belongs to board admin
        res.status(200).json({ "success": true, "details": events });
    }
    catch(err){
        res.status(500).json({ "success": false, "message" : err.toString() });
    }
}

exports.deleteSahyogEventResult = async (req,res) => {
    try{
        const id = req.params.id;
        console.log(id);
        let sahyogEventSchedule = await sahyogEventModel.findById(id);
        console.log(sahyogEventSchedule);
        if(await ifAuthorizedForSahyogEventSchedules(id,req.body.email)===false){
            res.status(403).json({ "success": false, "message": "You are not authorized admin"});
            return;
        }
        let gcCompetitionsStore = await getGcScoreboardStore();
        for(let i=0;i<sahyogEventSchedule["results"].length;i++){
            for(let j=0;j<gcCompetitionsStore["overallGcStandings"].length;j++){
                if(sahyogEventSchedule["results"][i]["hostelName"] === gcCompetitionsStore["overallGcStandings"][j]["hostelName"]){
                    // hostel found in gc competitions store
                    gcCompetitionsStore["overallGcStandings"][j]["sahyog_points"]-=sahyogEventSchedule["results"][i]["points"];// subtract old points
                }
            }
        }
        await gcCompetitionsStore.save();
        sahyogEventSchedule["resultAdded"]=false;
        sahyogEventSchedule["victoryStatement"]='';
        sahyogEventSchedule["results"]=[];
        await sahyogEventSchedule.save();
        res.json({ "success": true, "message": "sahyog event result deleted successfully" });
    }
    catch(err){
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}



