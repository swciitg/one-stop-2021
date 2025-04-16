import {
  getGcScoreboardStore,
  checkIfAdmin,
  checkIfBoardAdmin,
  ifValidEvent,
} from "../../helpers/gcScoreboardHelpers.js";

import { manthanEventModel } from "../../models/gcModels/manthanModel.js";

async function ifAuthorizedForManthanEventSchedules(eventId, email) {
  let manthanEventSchedule = await manthanEventModel.findById(eventId);
  console.log(manthanEventSchedule);
  if (
    manthanEventSchedule["posterEmail"] !== email &&
    (await checkIfBoardAdmin(email, "manthan")) === false
  ) {
    return false;
  }
  return true;
}

export const getManthanEvents = async (req, res) => {
  try {
    let gcCompetitionsStore = await getGcScoreboardStore();
    res.json({ success: true, details: gcCompetitionsStore.manthan_events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};

export const postManthanEvents = async (req, res) => {
  try {
    let manthanEvents = req.body.events;
    if (manthanEvents === undefined) {
      res
        .status(400)
        .json({ success: false, message: "Not valid parameters in request" });
      return;
    }
    const gcScoreboardStore = await getGcScoreboardStore();
    gcScoreboardStore.manthan_events = manthanEvents;
    await gcScoreboardStore.save();
    res.json({
      success: true,
      message: "manthan events posted successfully",
      details: gcScoreboardStore.manthan_events,
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};

export const getManthanOverallStandings = async (req, res) => {
  try {
    let gcCompetitionsStore = await getGcScoreboardStore();
    let gcStandings = [];
    gcCompetitionsStore["overallGcStandings"].forEach((hostelGcPoints) => {
      let roundedPoints =
        Math.round(hostelGcPoints["manthan_points"] * 100) / 100;
      gcStandings.push({
        hostelName: hostelGcPoints["hostelName"],
        points: roundedPoints,
      });
    });
    res.json({ success: true, details: gcStandings });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};

export const getManthanEventStandings = async (req, res) => {
  try {
    let eventsSchedules = await manthanEventModel.find({ resultAdded: true });
    res.json({ success: true, details: eventsSchedules });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};

export const postManthanEventSchedule = async (req, res) => {
  try {
    req.body.posterEmail = req.body.email;

    if ((await ifValidEvent(req.body.event, "manthan")) === false) {
      res.status(406).json({
        success: false,
        message: "Event not in list of manthan events",
      });
      return;
    }
    if (
      (await manthanEventModel.find({ event: req.body.event })).length !== 0
    ) {
      res.status(406).json({
        success: false,
        message: "Schedule already added for these details",
      });
      return;
    }

    await manthanEventModel(req.body).save();
    res.json({
      success: true,
      message: "manthan event schedule posted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};

export const getManthanEventsSchdedules = async (req, res) => {
  try {
    console.log(
      await checkIfAdmin(req.body.email, "manthan"),
      await checkIfBoardAdmin(req.body.email, "manthan")
    );
    let filters = { resultAdded: false }; // filters for event schedules
    if (
      req.query.forAdmin === "true" &&
      (await checkIfBoardAdmin(req.body.email, "manthan")) === false
    ) {
      filters["posterEmail"] = req.body.email;
    }
    console.log(filters);
    const events = await manthanEventModel.find(filters).sort({ date: 1 }); // send all event schedules if no email passed or passed email belongs to board admin in ascending order of sorting
    res.status(200).json({ success: true, details: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};

export const updateManthanEventSchedule = async (req, res) => {
  console.log("here fasdfad");
  try {
    const id = req.params.id;
    req.body.posterEmail = req.body.email;
    console.log(req.body, id);
    if (
      (await ifAuthorizedForManthanEventSchedules(id, req.body.email)) === false
    ) {
      res
        .status(403)
        .json({ success: false, message: "You are not authorized admin" });
      return;
    }
    let sameManthanEvents = await manthanEventModel.find({
      event: req.body.event,
    });
    console.log(sameManthanEvents);
    if (
      sameManthanEvents.length !== 0 &&
      sameManthanEvents[0]["_id"].toString() !== id &&
      sameManthanEvents[0]["event"] === req.body.event
    ) {
      res.status(406).json({
        success: false,
        message: "Schedule already added for these details",
      });
      return;
    }
    console.log(req.body);
    let manthanEventSchedule = await manthanEventModel.findById(id);
    req.body.posterEmail = manthanEventSchedule.posterEmail;

    let sameEvents = await manthanEventModel.find({ event: req.body.event });

    if (
      !(manthanEventSchedule["event"] === req.body.event) &&
      sameEvents.length !== 0
    ) {
      res.status(406).json({
        success: false,
        message: "Schedule already added for theis event name",
      });
      return;
    }
    await manthanEventModel.findOneAndUpdate({ _id: id }, req.body, {
      runValidators: true,
    });
    res.json({ success: true, message: "manthan event updated successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};

export const addManthanEventResult = async (req, res) => {
  try {
    const id = req.params.id;
    let manthanEventSchedule = await manthanEventModel.findById(id);

    if (
      (await ifAuthorizedForManthanEventSchedules(id, req.body.email)) === false
    ) {
      res
        .status(403)
        .json({ success: false, message: "You are not authorized admin" });
      return;
    }

    req.body.resultAdded = true;
    req.body.results.forEach((result) => {
      result["points"] = result["primaryScore"];
    });
    console.log(manthanEventSchedule);
    await manthanEventModel.findOneAndUpdate({ _id: id }, req.body, {
      runValidators: true,
    });
    let gcCompetitionsStore = await getGcScoreboardStore();
    console.log(manthanEventSchedule);
    console.log("HELLO THERE");

    for (let i = 0; i < manthanEventSchedule["results"].length; i++) {
      for (
        let j = 0;
        j < gcCompetitionsStore["overallGcStandings"].length;
        j++
      ) {
        if (
          manthanEventSchedule["results"][i]["hostelName"] ===
          gcCompetitionsStore["overallGcStandings"][j]["hostelName"]
        ) {
          gcCompetitionsStore["overallGcStandings"][j]["manthan_points"] -=
            manthanEventSchedule["results"][i]["primaryScore"];
        }
      }
    }
    for (let i = 0; i < req.body["results"].length; i++) {
      for (
        let j = 0;
        j < gcCompetitionsStore["overallGcStandings"].length;
        j++
      ) {
        if (
          req.body["results"][i]["hostelName"] ===
          gcCompetitionsStore["overallGcStandings"][j]["hostelName"]
        ) {
          gcCompetitionsStore["overallGcStandings"][j]["manthan_points"] +=
            req.body["results"][i]["primaryScore"];
        }
      }
    }
    await gcCompetitionsStore.save();

    res.json({
      success: true,
      message: "manthan event result added successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};

export const deleteManthanEventSchedule = async (req, res) => {
  try {
    const id = req.params.id;
    let manthanEventSchedule = await manthanEventModel.findById(id);
    if (
      (await ifAuthorizedForManthanEventSchedules(id, req.body.email)) === false
    ) {
      res
        .status(403)
        .json({ success: false, message: "You are not authorized admin" });
      return;
    }
    await manthanEventModel.findByIdAndDelete(id);
    res.json({ success: true, message: "manthan event deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};

export const getManthanResults = async (req, res) => {
  try {
    console.log(
      await checkIfAdmin(req.body.email, "manthan"),
      await checkIfBoardAdmin(req.body.email, "manthan")
    );
    let filters = { resultAdded: true }; // filters for event schedules
    if (
      req.query.forAdmin === "true" &&
      (await checkIfBoardAdmin(req.body.email, "manthan")) === false
    ) {
      filters["posterEmail"] = req.body.email;
    }

    const events = await manthanEventModel.find(filters).sort({ date: -1 });

    res.status(200).json({ success: true, details: events });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};

export const deleteManthanEventResult = async (req, res) => {
  try {
    const id = req.params.id;
    console.log(id);
    let manthanEventSchedule = await manthanEventModel.findById(id);

    if (
      (await ifAuthorizedForManthanEventSchedules(id, req.body.email)) === false
    ) {
      res
        .status(403)
        .json({ success: false, message: "You are not authorized admin" });
      return;
    }
    let gcCompetitionsStore = await getGcScoreboardStore();
    for (let i = 0; i < manthanEventSchedule["results"].length; i++) {
      for (
        let j = 0;
        j < gcCompetitionsStore["overallGcStandings"].length;
        j++
      ) {
        if (
          manthanEventSchedule["results"][i]["hostelName"] ===
          gcCompetitionsStore["overallGcStandings"][j]["hostelName"]
        ) {
          gcCompetitionsStore["overallGcStandings"][j]["manthan_points"] -=
            manthanEventSchedule["results"][i]["points"];
        }
      }
    }
    await gcCompetitionsStore.save();
    manthanEventSchedule["resultAdded"] = false;
    manthanEventSchedule["victoryStatement"] = "";
    manthanEventSchedule["results"] = [];
    await manthanEventSchedule.save();
    res.json({
      success: true,
      message: "manthan event result deleted successfully",
    });
  } catch (err) {
    res.status(500).json({ success: false, message: err.toString() });
  }
};
