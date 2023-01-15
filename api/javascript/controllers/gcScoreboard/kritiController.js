const { getGcScoreboardStore } = require("../../helpers/gcScoreboardHelpers")

async function ifAuthorizedForKritiEventSchedules(eventId, email){
    let kritiEventSchedule = await kritiEventModel.findById(eventId);
    if(kritiEventSchedule["posterEmail"] !== email && await checkIfBoardAdmin(email,"kriti")===false){
        return false;
    }
    return true;
}


exports.getKritiEvents = async (req,res) => {
    try{
        let gcCompetitionsStore = await getGcScoreboardStore();
        res.json({"success" : true, "details" : gcCompetitionsStore.kriti_events});
    }
    catch(err){
        res.status(500).json({"success" : false,"message" : err.toString()});
    }
}

exports.postKritiEvents= async (req, res) => {
    try {
        let kritiEvents = req.body.events;
        if(kritiEvents===undefined){
            res.status(400).json({ "success": false, "message": "Not valid parameters in request"});
            return;
        }
        const gcScoreboardStore = await getGcScoreboardStore();
        gcScoreboardStore.kriti_events = kritiEvents;
        await gcScoreboardStore.save();
        res.json({"success" : true, "message" : "kriti events posted successfully","details" : gcScoreboardStore.kriti_events});
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}


exports.postKritiEventSchedule = async (req,res) => {
    
}

