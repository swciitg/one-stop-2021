import { getGcScoreboardStore, checkIfAdmin, checkIfBoardAdmin, ifValidEvent } from "../../helpers/gcScoreboardHelpers.js";
import { kritiEventModel } from "../../models/gcModels/kritiModel.js";

async function ifAuthorizedForKritiEventSchedules(eventId, email) {
    let kritiEventSchedule = await kritiEventModel.findById(eventId);
    if (kritiEventSchedule["posterEmail"] !== email && await checkIfBoardAdmin(email, "kriti") === false) {
        return false;
    }
    return true;
}

export async function getKritiEvents(req, res) {
    try {
        let gcCompetitionsStore = await getGcScoreboardStore();
        res.json({ "success": true, "details": gcCompetitionsStore.kriti_events });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function postKritiEvents(req, res) {
    try {
        let kritiEvents = req.body.events;
        if (kritiEvents === undefined) {
            res.status(400).json({ "success": false, "message": "Not valid parameters in request" });
            return;
        }
        const gcScoreboardStore = await getGcScoreboardStore();
        gcScoreboardStore.kriti_events = kritiEvents;
        await gcScoreboardStore.save();
        res.json({ "success": true, "message": "kriti events posted successfully", "details": gcScoreboardStore.kriti_events });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function getKritiOverallStandings(req, res) {
    try {
        let gcCompetitionsStore = await getGcScoreboardStore();
        let gcStandings = [];
        gcCompetitionsStore["overallGcStandings"].forEach((hostelGcPoints) => {
            console.log(hostelGcPoints);
            let roundedPoints = Math.round(hostelGcPoints["kriti_points"] * 100) / 100;
            gcStandings.push({ "hostelName": hostelGcPoints["hostelName"], "points": roundedPoints });
        });
        res.json({ "success": true, "details": gcStandings });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function getKritiEventStandings(req, res) {
    try {
        let eventsSchedules = await kritiEventModel.find({ "resultAdded": true });
        res.json({ "success": true, "details": eventsSchedules });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function postKritiEventSchedule(req, res) {
    try {
        req.body.posterEmail = req.body.email;
        console.log(req.body);
        if (await ifValidEvent(req.body.event, "kriti") === false) {
            res.status(406).json({ "success": false, "message": "Event not in list of kriti events" });
            return;
        }
        if ((await kritiEventModel.find({ "event": req.body.event })).length !== 0) {
            res.status(406).json({ "success": false, "message": "Schedule already added for these details" });
            return;
        }
        console.log(req.body);
        await kritiEventModel(req.body).save();
        res.json({ "success": true, "message": "kriti event schedule posted successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function getKritiEventsSchdedules(req, res) {
    try {
        console.log(await checkIfAdmin(req.body.email, "kriti"), await checkIfBoardAdmin(req.body.email, "kriti"));
        let filters = { "resultAdded": false }; // filters for event schedules
        if (req.query.forAdmin === "true" && await checkIfBoardAdmin(req.body.email, "kriti") === false) {
            filters["posterEmail"] = req.body.email;
        }
        console.log(filters);
        const events = await kritiEventModel.find(filters).sort({ "date": 1 }); // send all event schedules if no email passed or passed email belongs to board admin
        res.status(200).json({ "success": true, "details": events });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function updateKritiEventSchedule(req, res) { // this is used for result posting and updation
    try {
        const id = req.params.id;
        console.log(req.body.email, id);
        if (await ifAuthorizedForKritiEventSchedules(id, req.body.email) === false) {
            res.status(403).json({ "success": false, "message": "You are not authorized admin" });
            return;
        }
        let sameKritiEvents = await kritiEventModel.find({ "event": req.body.event });
        if (sameKritiEvents.length !== 0 && sameKritiEvents[0]["_id"].toString() !== id && sameKritiEvents[0]["event"] === req.body.event) {
            res.status(406).json({ "success": false, "message": "Schedule already added for these details" });
            return;
        }
        let kritiEventSchedule = await kritiEventModel.findById(id);
        req.body.posterEmail = kritiEventSchedule.posterEmail;
        req.body.clubs.sort();
        let sameEvents = await kritiEventModel.find({ "event": req.body.event });
        console.log(sameEvents);
        if (!(kritiEventSchedule["event"] === req.body.event) && sameEvents.length !== 0) {
            res.status(406).json({ "success": false, "message": "Schedule already added for these details" });
            return;
        }
        await kritiEventModel.findOneAndUpdate({ _id: id }, req.body, { runValidators: true });
        res.json({ "success": true, "message": "kriti event updated successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function addKritiEventResult(req, res) { // for result added and updation
    try {
        const id = req.params.id;
        let kritiEventSchedule = await kritiEventModel.findById(id);
        if (await ifAuthorizedForKritiEventSchedules(id, req.body.email) === false) {
            res.status(403).json({ "success": false, "message": "You are not authorized admin" });
            return;
        }
        console.log(req.body.results);
        req.body.resultAdded = true;
        await kritiEventModel.findOneAndUpdate({ _id: id }, req.body, { runValidators: true });
        let gcCompetitionsStore = await getGcScoreboardStore();
        for (let i = 0; i < kritiEventSchedule["results"].length; i++) {
            for (let j = 0; j < gcCompetitionsStore["overallGcStandings"].length; j++) {
                if (kritiEventSchedule["results"][i]["hostelName"] === gcCompetitionsStore["overallGcStandings"][j]["hostelName"]) {
                    // hostel found in gc competitions store
                    gcCompetitionsStore["overallGcStandings"][j]["kriti_points"] -= kritiEventSchedule["results"][i]["points"];// subtract old points
                }
            }
        }
        for (let i = 0; i < req.body["results"].length; i++) {
            for (let j = 0; j < gcCompetitionsStore["overallGcStandings"].length; j++) {
                if (req.body["results"][i]["hostelName"] === gcCompetitionsStore["overallGcStandings"][j]["hostelName"]) {
                    // hostel found in gc competitions store
                    gcCompetitionsStore["overallGcStandings"][j]["kriti_points"] += req.body["results"][i]["points"]; // add new points
                }
            }
        }
        await gcCompetitionsStore.save();
        console.log((await kritiEventModel.findById(id)));
        res.json({ "success": true, "message": "kriti event result added successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function deleteKritiEventSchedule(req, res) {
    try {
        const id = req.params.id;
        let kritiEventSchedule = await kritiEventModel.findById(id);
        if (await ifAuthorizedForKritiEventSchedules(id, req.body.email) === false) {
            res.status(403).json({ "success": false, "message": "You are not authorized admin" });
            return;
        }
        await kritiEventModel.findByIdAndDelete(id);
        res.json({ "success": true, "message": "kriti event deleted successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function getKritiResults(req, res) {
    try {
        console.log(await checkIfAdmin(req.body.email, "kriti"), await checkIfBoardAdmin(req.body.email, "kriti"));
        let filters = { "resultAdded": true }; // filters for event schedules
        if (req.query.forAdmin === "true" && await checkIfBoardAdmin(req.body.email, "kriti") === false) {
            filters["posterEmail"] = req.body.email;
        }
        console.log(filters);
        const events = await kritiEventModel.find(filters).sort({ "date": -1 }); // send all event schedules if no email passed or passed email belongs to board admin
        res.status(200).json({ "success": true, "details": events });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}

export async function deleteKritiEventResult(req, res) {
    try {
        const id = req.params.id;
        console.log(id);
        let kritiEventSchedule = await kritiEventModel.findById(id);
        console.log(kritiEventSchedule);
        if (await ifAuthorizedForKritiEventSchedules(id, req.body.email) === false) {
            res.status(403).json({ "success": false, "message": "You are not authorized admin" });
            return;
        }
        let gcCompetitionsStore = await getGcScoreboardStore();
        for (let i = 0; i < kritiEventSchedule["results"].length; i++) {
            for (let j = 0; j < gcCompetitionsStore["overallGcStandings"].length; j++) {
                if (kritiEventSchedule["results"][i]["hostelName"] === gcCompetitionsStore["overallGcStandings"][j]["hostelName"]) {
                    // hostel found in gc competitions store
                    gcCompetitionsStore["overallGcStandings"][j]["kriti_points"] -= kritiEventSchedule["results"][i]["points"];// subtract old points
                }
            }
        }
        await gcCompetitionsStore.save();
        kritiEventSchedule["resultAdded"] = false;
        kritiEventSchedule["victoryStatement"] = '';
        kritiEventSchedule["results"] = [];
        await kritiEventSchedule.save();
        res.json({ "success": true, "message": "kriti event result deleted successfully" });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
    }
}
