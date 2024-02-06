const express = require("express");
const gcScoreboardRouter = express.Router();
const jwt = require("jsonwebtoken");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;
console.log(accessjwtsecret, refreshjwtsecret);
const {
  gcScoreboardAuthMiddleware,
} = require("../middlewares/gcScoreboardAuth");
const { checkIfModeratorMiddleware } = require("../middlewares/addAdmin");
const {
  deleteAnEventSchedule,
  postSpardhaEvents,
  getSpardhaEvents,
  postSpardhaEventSchedule,
  getSpardhaEventsSchdedules,
  getGcOverallStandings,
  getSpardhaOverallStandings,
  updateSpardhaOverallStanding,
  updateSpardhaEventSchedule,
  addSpardhaEventResult,
  getSpardhaResults,
  deleteSpardhaEventResult,
  postSpardhaOverallStandings,
  deleteSpardhaStanding,
  getSpardhaEventStandings,
} = require("../controllers/gcScoreboard/spardhaController");
const {
  gcRequestsMiddleware,
} = require("../middlewares/gcChampionshipMiddlewares");
const { getGcScoreboardStore } = require("../helpers/gcScoreboardHelpers");
const {
  postCompetitionAdmins,
  postCompetitionBoardAdmins,
} = require("../controllers/gcScoreboard/gcController");
const {
  getKritiEvents,
  postKritiEvents,
  getKritiEventsSchdedules,
  postKritiEventSchedule,
  updateKritiEventSchedule,
  deleteKritiEventSchedule,
  getKritiResults,
  addKritiEventResult,
  deleteKritiEventResult,
  getKritiOverallStandings,
  getKritiEventStandings,
} = require("../controllers/gcScoreboard/kritiController");
const {
  getSahyogEvents,
  postSahyogEvents,
  getSahyogOverallStandings,
  getSahyogEventStandings,
  getSahyogEventsSchdedules,
  postSahyogEventSchedule,
  updateSahyogEventSchedule,
  deleteSahyogEventSchedule,
  getSahyogResults,
  addSahyogEventResult,
  deleteSahyogEventResult,
} = require("../controllers/gcScoreboard/sahyogController");
const { postManthanEvents, getManthanEventStandings, addManthanEventResult, deleteManthanEventResult, deleteManthanEventSchedule, getManthanEvents, getManthanEventsSchdedules, getManthanOverallStandings, getManthanResults, postManthanEventSchedule, updateManthanEventSchedule } = require("../controllers/gcScoreboard/manthanController");
const { verifyUserRequest } = require("../middlewares/user.auth");

async function getAuthEvents(email) {
  let gcCompetitionsStore = await getGcScoreboardStore();
  let authEvents = [];
  if (
    gcCompetitionsStore.spardha_admins.includes(email) ||
    gcCompetitionsStore.spardha_board_admins.includes(email)
  ) {
    authEvents.push("spardha");
  }
  if (
    gcCompetitionsStore.manthan_admins.includes(email) ||
    gcCompetitionsStore.manthan_board_admins.includes(email)
  ) {
    authEvents.push("manthan");
  }
  if (
    gcCompetitionsStore.kriti_admins.includes(email) ||
    gcCompetitionsStore.kriti_board_admins.includes(email)
  ) {
    authEvents.push("kriti");
  }
  if (
    gcCompetitionsStore.sahyog_admins.includes(email) ||
    gcCompetitionsStore.sahyog_board_admins.includes(email)
  ) {
    authEvents.push("sahyog");
  }
  console.log(authEvents);
  return authEvents;
}

gcScoreboardRouter.post("/gc/login", async (req, res) => {
  try {
    let email = req.body.email;
    if (email === undefined) {
      throw new Error("Not Valid parameters in body");
    }
    const accessToken = jwt.sign({ email: email }, accessjwtsecret, {
      expiresIn: "1 days",
    });
    console.log(jwt.verify(accessToken, accessjwtsecret));
    const refreshToken = jwt.sign({ email: email }, refreshjwtsecret, {
      expiresIn: "7 days",
    });
    const authEvents = await getAuthEvents(email);

    const isAdmin = authEvents.length === 0 ? false : true;
    res.json({ success: true, accessToken, refreshToken, isAdmin, authEvents });
  } catch (err) {
    res.status(400).json({ success: false, message: err.toString() });
  }
});

gcScoreboardRouter.post("/gc/gen-accesstoken", (req, res) => {
  try {
    let reftoken = req.headers.authorization.split(" ").slice(-1)[0];
    let decoded = jwt.verify(reftoken, refreshjwtsecret);
    const accessToken = jwt.sign({ email: decoded["email"] }, accessjwtsecret, {
      expiresIn: "1 days",
    });
    res.json({ success: true, token: accessToken });
  } catch (err) {
    res
      .status(401)
      .json({ success: false, message: "Invalid Token or Token Expired" });
  }
});

// Moderator routes

gcScoreboardRouter.post(
  "/gc/competition-admins/:competition",
  checkIfModeratorMiddleware,
  postCompetitionAdmins
);

gcScoreboardRouter.post(
  "/gc/competition-board-admins/:competition",
  checkIfModeratorMiddleware,
  postCompetitionBoardAdmins
);

gcScoreboardRouter.post(
  "/gc/spardha/all-events",
  checkIfModeratorMiddleware,
  postSpardhaEvents
);

gcScoreboardRouter.post(
  "/gc/kriti/all-events",
  checkIfModeratorMiddleware,
  postKritiEvents
);

gcScoreboardRouter.post(
  "/gc/manthan/all-events",
  checkIfModeratorMiddleware,
  postManthanEvents
);

gcScoreboardRouter.post(
  "/gc/sahyog/all-events",
  checkIfModeratorMiddleware,
  postSahyogEvents
);

// open routes -> no tokens needed

gcScoreboardRouter.get("/gc/spardha/all-events", getSpardhaEvents);

gcScoreboardRouter.get("/gc/kriti/all-events", getKritiEvents);

gcScoreboardRouter.get("/gc/sahyog/all-events", getSahyogEvents);

gcScoreboardRouter.get("/gc/manthan/all-events", getManthanEvents);

gcScoreboardRouter.use(verifyUserRequest); // check tokens for all below routes with this middleware

gcScoreboardRouter.get("/gc/overall/standings", getGcOverallStandings);

// spardha routes

gcScoreboardRouter.get("/gc/spardha/standings", getSpardhaOverallStandings);

gcScoreboardRouter.get(
  "/gc/spardha/standings/all-events",
  getSpardhaEventStandings
);

gcScoreboardRouter.post(
  "/gc/spardha/standings",
  gcRequestsMiddleware,
  postSpardhaOverallStandings
);

gcScoreboardRouter.patch(
  "/gc/spardha/standings/:id",
  gcRequestsMiddleware,
  updateSpardhaOverallStanding
);

gcScoreboardRouter.delete(
  "/gc/spardha/standings/:id",
  gcRequestsMiddleware,
  deleteSpardhaStanding
);

gcScoreboardRouter.get(
  "/gc/spardha/event-schedule",
  getSpardhaEventsSchdedules
);

gcScoreboardRouter.post(
  "/gc/spardha/event-schedule",
  gcRequestsMiddleware,
  postSpardhaEventSchedule
);

gcScoreboardRouter.patch(
  "/gc/spardha/event-schedule/:id",
  gcRequestsMiddleware,
  updateSpardhaEventSchedule
);

gcScoreboardRouter.delete(
  "/gc/spardha/event-schedule/:id",
  gcRequestsMiddleware,
  deleteAnEventSchedule
);

gcScoreboardRouter.get("/gc/spardha/event-schedule/results", getSpardhaResults);

gcScoreboardRouter.patch(
  "/gc/spardha/event-schedule/result/:id",
  gcRequestsMiddleware,
  addSpardhaEventResult
);

gcScoreboardRouter.delete(
  "/gc/spardha/event-schedule/result/:id",
  gcRequestsMiddleware,
  deleteSpardhaEventResult
);

// kriti routes

gcScoreboardRouter.get("/gc/kriti/standings", getKritiOverallStandings);

gcScoreboardRouter.get(
  "/gc/kriti/standings/all-events",
  getKritiEventStandings
);

gcScoreboardRouter.get("/gc/kriti/event-schedule", getKritiEventsSchdedules);

gcScoreboardRouter.post(
  "/gc/kriti/event-schedule",
  gcRequestsMiddleware,
  postKritiEventSchedule
);

gcScoreboardRouter.patch(
  "/gc/kriti/event-schedule/:id",
  gcRequestsMiddleware,
  updateKritiEventSchedule
);

gcScoreboardRouter.delete(
  "/gc/kriti/event-schedule/:id",
  gcRequestsMiddleware,
  deleteKritiEventSchedule
);

gcScoreboardRouter.get("/gc/kriti/event-schedule/results", getKritiResults);

gcScoreboardRouter.patch(
  "/gc/kriti/event-schedule/result/:id",
  gcRequestsMiddleware,
  addKritiEventResult
);

gcScoreboardRouter.delete(
  "/gc/kriti/event-schedule/result/:id",
  gcRequestsMiddleware,
  deleteKritiEventResult
);

// sahyog routes

gcScoreboardRouter.get("/gc/sahyog/standings", getSahyogOverallStandings);

gcScoreboardRouter.get(
  "/gc/sahyog/standings/all-events",
  getSahyogEventStandings
);

gcScoreboardRouter.get("/gc/sahyog/event-schedule", getSahyogEventsSchdedules);

gcScoreboardRouter.post(
  "/gc/sahyog/event-schedule",
  gcRequestsMiddleware,
  postSahyogEventSchedule
);

gcScoreboardRouter.patch(
  "/gc/sahyog/event-schedule/:id",
  gcRequestsMiddleware,
  updateSahyogEventSchedule
);

gcScoreboardRouter.delete(
  "/gc/sahyog/event-schedule/:id",
  gcRequestsMiddleware,
  deleteSahyogEventSchedule
);

gcScoreboardRouter.get("/gc/sahyog/event-schedule/results", getSahyogResults);

gcScoreboardRouter.patch(
  "/gc/sahyog/event-schedule/result/:id",
  gcRequestsMiddleware,
  addSahyogEventResult
);

gcScoreboardRouter.delete(
  "/gc/sahyog/event-schedule/result/:id",
  gcRequestsMiddleware,
  deleteSahyogEventResult
);

// manthan routes

//get routes

gcScoreboardRouter.get("/gc/manthan/standings", getManthanOverallStandings);

gcScoreboardRouter.get(
  "/gc/manthan/standings/all-events",
  getManthanEventStandings
);

gcScoreboardRouter.get(
  "/gc/manthan/event-schedule",
  getManthanEventsSchdedules
);


gcScoreboardRouter.get("/gc/manthan/event-schedule/results", getManthanResults);


//post routes

gcScoreboardRouter.post(
  "/gc/manthan/event-schedule",
  gcRequestsMiddleware,
  postManthanEventSchedule
);


//patch routes

gcScoreboardRouter.patch(
  "/gc/manthan/event-schedule/:id",
  gcRequestsMiddleware,
  updateManthanEventSchedule
);

gcScoreboardRouter.patch(
  "/gc/manthan/event-schedule/result/:id",
  gcRequestsMiddleware,
  addManthanEventResult
);


//delete routes


gcScoreboardRouter.delete(
  "/gc/manthan/event-schedule/:id",
  gcRequestsMiddleware,
  deleteManthanEventSchedule
);

gcScoreboardRouter.delete(
  "/gc/manthan/event-schedule/result/:id",
  gcRequestsMiddleware,
  deleteManthanEventResult
);

module.exports = { gcScoreboardRouter };
