const { getGcScoreboardStore, checkIfAdmin, checkIfBoardAdmin } = require("../helpers/gcScorebaordHelpers");
const { gcCompetitionsStoreModel, spardhaEventModel } = require("../models/gcScoreboardModel");

async function ifValidEvent(event,competition){
    let gcCompetitionsStore = await getGcScoreboardStore();
    if(competition==="spardha" && gcCompetitionsStore.spardha_events.includes(event) ||
    competition==="manthan" && gcCompetitionsStore.manthan_events.includes(event) ||
    competition==="kriti" && gcCompetitionsStore.kriti_events.includes(event)
    ) return true;
    return false;
}

// Spardha - user

exports.getEventsResult = async (req, res) => {
    try {
        const query_email = req.query.email;
        if (query_email) {
            const events = await spardhaEventModel.find({ posterEmail: query_email, resultAdded: true });
            res.status(200).json({ "success": true, "details": events });
        }
        else {
            const events = await spardhaEventModel.find({ resultAdded: true });
            res.status(200).json({ "success": true, "details": events });
        }
    } catch (err) {
        res.status(401).json({ "success": false, "message": err.toString() });
    }
}

exports.postSpardhaEvents= async (req, res) => {
    try {
        let spardhaEvents = req.body.events;
        if(spardhaEvents===undefined){
            throw new Error("Not valid parameters in request");
        }
        const gcScoreboardStore = await getGcScoreboardStore();
        gcScoreboardStore.spardha_events = spardhaEvents;
        await gcScoreboardStore.save();
        res.json({"success" : true, "message" : "Spardha events posted successfully","details" : gcScoreboardStore.spardha_events});
    } catch (err) {
        res.status(400).json({ "success": false, "message": err.toString() });
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
        let filters = {}; // filters for event schedules
        if(req.query.forAdmin==="true" && await checkIfBoardAdmin(req.body.email,"spardha")===false){
            filters["posterEmail"]=req.body.email;
        }
        if(req.query.date!==undefined){
            let lowerDate = new Date(req.query.date);
            let upperDate = new Date(req.query.date);
            upperDate.setDate(upperDate.getDate() + 1);
            filters["date"]={
                $gte: lowerDate,
                $lt: upperDate
            }
        }
        console.log(filters);
        const events = await spardhaEventModel.find(filters).sort({ "date": 1 }); // send all event schedules if no email passed or passed email belongs to board admin
        res.status(200).json({ "success": true, "details": events });
    }
    catch(err){
        res.status(500).json({ "success": true, "message" : err.toString() });
    }
};

exports.postSpardhaEventSchedule = async (req, res) => {
    try {
        if(await ifValidEvent(req.body.event,"spardha")===false){
            throw new Error("Event not in list of spardha events");
        }
        req.body.date = new Date(req.body.date);
        req.body.posterEmail = req.body.email;
        let spardhaEvent = new spardhaEventModel(req.body);
        await spardhaEvent.save();
        res.json({ "success": true });
    }
    catch (err) {
        res.status(400).json({ "success": false, "message": err.toString() });
    }
};

// Spardha - admin
exports.addResultSpardha = async (req, res) => {
    try {
        let spardhaEvent = new spardhaEventSchedule(req.body);
        await spardhaEvent.save();
        res.json({ "success": true });
    }
    catch (err) {
        res.status(400).json({ "success": false, "message": err.toString() });
    }
};


exports.addEventSchedule = async (req, res) => {
    try {
        req.body.posterEmail = req.body.email;
        let spardhaEventSchedule = new spardhaEventSchedule(req.body);
        console.log(spardhaEventSchedule);
        res.json({});
    } catch (err) {
        res.status(401).json({ "success": false, "message": err.toString() });
    }
}

exports.addEventResult = async (req, res) => {
    try {
        const id = req.params.id;
        const email = req.body.email;

        const event = await spardhaEventModel.findById(id);

        if (!event) {
            throw new Error("Event Not Found")
        }

        else if (event.resultAdded) {
            throw new Error("Result Already Added");
        }
        else {
            const details = req.body;
            for (var i = 0; i < details.length; i++) {

            }
        }
    } catch (err) {
        res.status(401).json({ "success": false, "message": err.toString() });
    }
}

exports.deleteAnEventSchedule = async (req, res) => {
    try {
        const event_id = req.params.id;
        let spardha_event = await spardhaEventModel.findById(event_id);

        if (spardha_event) {
            if (spardha_event.resultAdded === false) {
                spardha_event.eventDateTime = "";
                console.log(spardha_event)
                const updatingTheEvent = await spardhaEventModel.findByIdAndUpdate(event_id, spardha_event);

                res.status(200).json({ "success": true, "details": updatingTheEvent });
            }
            else {
                throw new Error("Event already completed");
            }
        }
        else {
            throw new Error("Event Not Found");
        }

    } catch (err) {
        res.status(401).json({ "success": false, "message": err.toString() });
    }
}


//Add admins

exports.postCompetitionAdmins = async (req, res) => {
    try {
        const competition = req.query.competition;
        const emails = req.body.emails;
        if(emails===undefined || competition===undefined){
            throw new Error("Not valid parameters in request");
        }
        const gcScoreboardStore = await getGcScoreboardStore();
        if (competition == "spardha") gcScoreboardStore.spardha_admins = emails;
        else if (competition == "manthan") gcScoreboardStore.manthan_admins = emails;
        else if(competition=="kriti") gcScoreboardStore.kriti_admins = emails;
        console.log(gcScoreboardStore);

        await gcCompetitionsStoreModel.findByIdAndUpdate(gcScoreboardStore._id, gcScoreboardStore);

        res.status(200).json({ "success": true, "message": `admins updated successfully to ${competition} admin list` });

    } catch (err) {
        res.status(400).json({ "success": false, "message": err.toString() });
        return;
    }
}



exports.postCompetitionBoardAdmins = async (req, res) => {
    try {
        const competition = req.query.competition;
        const emails = req.body.emails;
        if(emails===undefined || competition===undefined){
            throw new Error("Not valid parameters in request");
        }
        const gcScoreboardStore = await getGcScoreboardStore();
        if (competition == "spardha") gcScoreboardStore.spardha_board_admins = emails;
        else if (competition == "manthan") gcScoreboardStore.manthan_board_admins = emails;
        else if(competition=="kriti") gcScoreboardStore.kriti_board_admins = emails;
        console.log(gcScoreboardStore);
        await gcCompetitionsStoreModel.findByIdAndUpdate(gcScoreboardStore._id, gcScoreboardStore);

        res.status(200).json({ "success": true, "message": `admins updated successfully to ${competition} board admin list` });

    } catch (err) {
        res.status(400).json({ "success": false, "message": err.toString() });
        return;
    }
}


// add an email id to spardha/ manthan/ kriti admins list

// exports.addEmailToAdminsList = async(req,res)=>{

// }

