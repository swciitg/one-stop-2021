import { getGcScoreboardStore, checkIfAdmin, checkIfBoardAdmin, ifValidEvent } from "../../helpers/gcScoreboardHelpers.js";
import { sahyogEventModel } from "../../models/gcModels/sahyogModel.js";

async function ifAuthorizedForSahyogEventSchedules(eventId, email) {
    let sahyogEventSchedule = await sahyogEventModel.findById(eventId);
    if (sahyogEventSchedule["posterEmail"] !== email && await checkIfBoardAdmin(email, "sahyog") === false) {
        return false;
    }
    return true;
}

export async function getSahyogEvents(req, res) {
    try {
        let gcCompetitionsStore = await getGcScoreboardStore();
        res.json({ "success": true, "details": gcCompetitionsStore.sahyog_events });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function postSahyogEvents(req, res) {
    try {
        let sahyogEvents = req.body.events;
        if (sahyogEvents === undefined) {
            res.status(400).json({ "success": false, "message": "Not valid parameters in request" });
            return;
        }
        const gcScoreboardStore = await getGcScoreboardStore();
        gcScoreboardStore.sahyog_events = sahyogEvents;
        await gcScoreboardStore.save();
        res.json({ "success": true, "message": "sahyog events posted successfully", "details": gcScoreboardStore.sahyog_events });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function getSahyogOverallStandings(req, res) {
    try {
        let gcCompetitionsStore = await getGcScoreboardStore();
        let gcStandings = [];
        gcCompetitionsStore["overallGcStandings"].forEach((hostelGcPoints) => {
            let roundedPoints = Math.round(hostelGcPoints["sahyog_points"] * 100) / 100;
            gcStandings.push({ "hostelName": hostelGcPoints["hostelName"], "points": roundedPoints });
        });
        res.json({ "success": true, "details": gcStandings });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function getSahyogEventStandings(req, res) {
    try {
        let eventsSchedules = await sahyogEventModel.find({ "resultAdded": true });
        res.json({ "success": true, "details": eventsSchedules });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function postSahyogEventSchedule(req, res) {
    try {
        req.body.posterEmail = req.body.email;
        if (await ifValidEvent(req.body.event, "sahyog") === false) {
            res.status(406).json({ "success": false, "message": "Event not in list of sahyog events" });
            return;
        }
        if ((await sahyogEventModel.find({ "event": req.body.event })).length !== 0) {
            res.status(406).json({ "success": false, "message": "Schedule already added for these details" });
            return;
        }
        await sahyogEventModel(req.body).save();
        res.json({ "success": true, "message": "sahyog event schedule posted successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function getSahyogEventsSchdedules(req, res) {
    try {
        let filters = { "resultAdded": false };
        if (req.query.forAdmin === "true" && await checkIfBoardAdmin(req.body.email, "sahyog") === false) {
            filters["posterEmail"] = req.body.email;
        }
        const events = await sahyogEventModel.find(filters).sort({ "date": 1 });
        res.status(200).json({ "success": true, "details": events });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function updateSahyogEventSchedule(req, res) {
    try {
        const id = req.params.id;
        if (await ifAuthorizedForSahyogEventSchedules(id, req.body.email) === false) {
            res.status(403).json({ "success": false, "message": "You are not authorized admin" });
            return;
        }
        let sameSahyogEvents = await sahyogEventModel.find({ "event": req.body.event });
        if (sameSahyogEvents.length !== 0 && sameSahyogEvents[0]["_id"].toString() !== id && sameSahyogEvents[0]["event"] === req.body.event) {
            res.status(406).json({ "success": false, "message": "Schedule already added for these details" });
            return;
        }
        let sahyogEventSchedule = await sahyogEventModel.findById(id);
        req.body.posterEmail = sahyogEventSchedule.posterEmail;
        req.body.clubs.sort();
        let sameEvents = await sahyogEventModel.find({ "event": req.body.event });
        if (!(sahyogEventSchedule["event"] === req.body.event) && sameEvents.length !== 0) {
            res.status(406).json({ "success": false, "message": "Schedule already added for these details" });
            return;
        }
        await sahyogEventModel.findOneAndUpdate({ _id: id }, req.body, { runValidators: true });
        res.json({ "success": true, "message": "sahyog event updated successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function addSahyogEventResult(req, res) {
    try {
        const id = req.params.id;
        let sahyogEventSchedule = await sahyogEventModel.findById(id);
        if (await ifAuthorizedForSahyogEventSchedules(id, req.body.email) === false) {
            res.status(403).json({ "success": false, "message": "You are not authorized admin" });
            return;
        }
        req.body.resultAdded = true;
        await sahyogEventModel.findOneAndUpdate({ _id: id }, req.body, { runValidators: true });
        let gcCompetitionsStore = await getGcScoreboardStore();
        for (let i = 0; i < sahyogEventSchedule["results"].length; i++) {
            for (let j = 0; j < gcCompetitionsStore["overallGcStandings"].length; j++) {
                if (sahyogEventSchedule["results"][i]["hostelName"] === gcCompetitionsStore["overallGcStandings"][j]["hostelName"]) {
                    gcCompetitionsStore["overallGcStandings"][j]["sahyog_points"] -= sahyogEventSchedule["results"][i]["points"];
                }
            }
        }
        for (let i = 0; i < req.body["results"].length; i++) {
            for (let j = 0; j < gcCompetitionsStore["overallGcStandings"].length; j++) {
                if (req.body["results"][i]["hostelName"] === gcCompetitionsStore["overallGcStandings"][j]["hostelName"]) {
                    gcCompetitionsStore["overallGcStandings"][j]["sahyog_points"] += req.body["results"][i]["points"];
                }
            }
        }
        await gcCompetitionsStore.save();
        res.json({ "success": true, "message": "sahyog event result added successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function deleteSahyogEventSchedule(req, res) {
    try {
        const id = req.params.id;
        if (await ifAuthorizedForSahyogEventSchedules(id, req.body.email) === false) {
            res.status(403).json({ "success": false, "message": "You are not authorized admin" });
            return;
        }
        await sahyogEventModel.findByIdAndDelete(id);
        res.json({ "success": true, "message": "sahyog event deleted successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function getSahyogResults(req, res) {
    try {
        let filters = { "resultAdded": true };
        if (req.query.forAdmin === "true" && await checkIfBoardAdmin(req.body.email, "sahyog") === false) {
            filters["posterEmail"] = req.body.email;
        }
        const events = await sahyogEventModel.find(filters).sort({ "date": -1 });
        res.status(200).json({ "success": true, "details": events });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function deleteSahyogEventResult(req, res) {
    try {
        const id = req.params.id;
        let sahyogEventSchedule = await sahyogEventModel.findById(id);
        if (await ifAuthorizedForSahyogEventSchedules(id, req.body.email) === false) {
            res.status(403).json({ "success": false, "message": "You are not authorized admin" });
            return;
        }
        let gcCompetitionsStore = await getGcScoreboardStore();
        for (let i = 0; i < sahyogEventSchedule["results"].length; i++) {
            for (let j = 0; j < gcCompetitionsStore["overallGcStandings"].length; j++) {
                if (sahyogEventSchedule["results"][i]["hostelName"] === gcCompetitionsStore["overallGcStandings"][j]["hostelName"]) {
                    gcCompetitionsStore["overallGcStandings"][j]["sahyog_points"] -= sahyogEventSchedule["results"][i]["points"];
                }
            }
        }
        await gcCompetitionsStore.save();
        sahyogEventSchedule["resultAdded"] = false;
        sahyogEventSchedule["victoryStatement"] = '';
        sahyogEventSchedule["results"] = [];
        await sahyogEventSchedule.save();
        res.json({ "success": true, "message": "sahyog event result deleted successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}
