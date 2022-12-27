const express = require("express");
const gcScoreboardRouter = express.Router();
const jwt = require("jsonwebtoken");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;
const { gcCompetitionsModel } = require("../models/gcScoreboardModel");
console.log(accessjwtsecret, refreshjwtsecret);
const { gcScoreboard } = require("../middlewares/gcBoradAuthAndAccess");
const {checkSuperAdmin} = require("../middlewares/addAdmin");
const { addEventAdmin, addBoardAdmin, getAllEvents, newEvent, deleteAnEventSchedule, addEventDetail, getEventsScheduled, getEventsResult } = require("../controllers/gcScoreboardController");
const { spardhaMiddleware } = require("../middlewares/spardhaMiddleware");

gcScoreboardRouter.use(gcScoreboard);

async function checkAdmin(email) {
    let authEvents = [];

    const array = await gcCompetitionsModel.find();
    const spardha_admins = array[0].spardha_admins;
    const kriti_admins = array[0].kriti_admins;
    const manthan_admins = array[0].manthan_admins;


    if (spardha_admins.includes(email)) authEvents.push("spardha");
    if (kriti_admins.includes(email)) authEvents.push("kriti");
    if (manthan_admins.includes(email)) authEvents.push("manthan");

    return authEvents;
}


async function checkBoardAdmin(email) {
    let authEvents = [];

    const array = await gcCompetitionsModel.find();
    const spardha_board_admins = array[0].spardha_board_admins;
    const kriti_board_admins = array[0].kriti_board_admins;
    const manthan_board_admins = array[0].manthan_board_admins;

    if (spardha_board_admins.includes(email)) authEvents.push("spardha_board");
    if (kriti_board_admins.includes(email)) authEvents.push("kriti_board");
    if (manthan_board_admins.includes(email)) authEvents.push("manthan_board");

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
        const AdminsArray = await checkAdmin(email);
        const BoardAdminArray = await checkBoardAdmin(email);
        const isAdmin = (AdminsArray.length === 0 || BoardAdminArray.length === 0) ? false : true;
        res.json({ "success": true, accessToken, refreshToken, isAdmin, AdminsArray, BoardAdminArray });
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


gcScoreboardRouter.patch("/gc/add-to-event-amdin", checkSuperAdmin, addEventAdmin)

gcScoreboardRouter.patch("/gc/add-to-event-board-amdin", checkSuperAdmin, addBoardAdmin)

gcScoreboardRouter.get("/gc/spardha/all-events",getAllEvents)

gcScoreboardRouter.post("/gc/spardha/all-events",spardhaMiddleware, newEvent);

gcScoreboardRouter.delete("/gc/spardha/admin/event-schedule/:id",spardhaMiddleware,deleteAnEventSchedule);

gcScoreboardRouter.post("/gc/spardha/admin/event-schedule/:id",spardhaMiddleware,addEventDetail);

gcScoreboardRouter.get("/gc/spardha/event-schedules",getEventsScheduled)

gcScoreboardRouter.get("/gc/spardha/event-results",getEventsResult);

// gcScoreboardRouter.post("/gc/spardha/admin/event-result/:id",spardhaMiddleware,)

module.exports = { gcScoreboardRouter };
