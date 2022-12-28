const express = require("express");
const gcScoreboardRouter = express.Router();
const jwt = require("jsonwebtoken");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;
console.log(accessjwtsecret, refreshjwtsecret);
const { gcScoreboardAuthMiddleware } = require("../middlewares/gcScoreboardAuth");
const {checkIfModeratorMiddleware} = require("../middlewares/addAdmin");
const { deleteAnEventSchedule, getEventsScheduled, getEventsResult, postCompetitionAdmins, postCompetitionBoardAdmins,  postSpardhaEvents, getSpardhaEvents, postSpardhaEventSchedule, getSpardhaEventsSchdedules} = require("../controllers/gcScoreboardController");
const { gcRequestsMiddleware } = require("../middlewares/gcChampionshipMiddlewares");
const { getGcScoreboardStore } = require("../helpers/gcScorebaordHelpers");

async function getAuthEvents(email){
    let gcCompetitionsStore = await getGcScoreboardStore();
    let authEvents = [];
    if(gcCompetitionsStore.spardha_admins.includes(email) || gcCompetitionsStore.spardha_board_admins.includes(email)){
        authEvents.push("spardha");
    }
    if(gcCompetitionsStore.manthan_admins.includes(email) || gcCompetitionsStore.manthan_board_admins.includes(email)){
        authEvents.push("manthan");
    }
    if(gcCompetitionsStore.kriti_admins.includes(email) || gcCompetitionsStore.kriti_board_admins.includes(email)){
        authEvents.push("kriti");
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
        const accessToken = jwt.sign({ "email": email }, accessjwtsecret, { expiresIn: "1 days" });
        console.log(jwt.verify(accessToken, accessjwtsecret));
        const refreshToken = jwt.sign({ "email": email }, refreshjwtsecret, { expiresIn: "7 days" });
        const authEvents = await getAuthEvents(email);
        const isAdmin = authEvents.length===0 ? false : true;
        res.json({ "success": true, accessToken, refreshToken, isAdmin, authEvents });
    }
    catch (err) {
        res.status(400).json({ "success": false, "message": err.toString() });
    }
});

gcScoreboardRouter.post("/gc/gen-accesstoken", (req, res) => {
    try {
        let reftoken = req.headers.authorization.split(' ').slice(-1)[0];
        let decoded = jwt.verify(reftoken, refreshjwtsecret);
        const accessToken = jwt.sign({ "email": decoded["email"] }, accessjwtsecret, { expiresIn: "1 days" });
        res.json({ "success": true, "token": accessToken });
    }
    catch (err) {
        res.status(401).json({ "success": false, "message": "Invalid Token or Token Expired" });
    }
});

gcScoreboardRouter.post("/gc/competition-admins", checkIfModeratorMiddleware, postCompetitionAdmins);

gcScoreboardRouter.post("/gc/competition-board-admins", checkIfModeratorMiddleware, postCompetitionBoardAdmins);

gcScoreboardRouter.get("/gc/spardha/all-events",getSpardhaEvents);

gcScoreboardRouter.post("/gc/spardha/all-events",checkIfModeratorMiddleware, postSpardhaEvents);

gcScoreboardRouter.use(gcScoreboardAuthMiddleware); // check tokens for all below routes with this middleware

gcScoreboardRouter.get("/gc/spardha/event-schedule",getSpardhaEventsSchdedules);

gcScoreboardRouter.post("/gc/spardha/event-schedule",gcRequestsMiddleware,postSpardhaEventSchedule);

gcScoreboardRouter.delete("/gc/spardha/event-schedule/:id",gcRequestsMiddleware,deleteAnEventSchedule);

gcScoreboardRouter.get("/gc/spardha/event-schedules",getEventsScheduled);

gcScoreboardRouter.get("/gc/spardha/event-results",getEventsResult);

// gcScoreboardRouter.post("/gc/spardha/admin/event-result/:id",spardhaMiddleware,)

module.exports = { gcScoreboardRouter };
