const dotenv = require("dotenv");
dotenv.config();
const { spardhaScoreModel } = require("../models/gcScoreboardModel")
const jwt = require("jsonwebtoken");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;
const { gcCompetitionsModel, spardhaEventModel } = require("../models/gcScoreboardModel");
console.log(accessjwtsecret, refreshjwtsecret);
const { gcScoreboard } = require("../middlewares/gcBoradAuthAndAccess");
const { checkSuperAdmin } = require("../middlewares/addAdmin");
// const {spardhaEventModel} = require("../models/gcScoreboardModel");


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

const super_admins = process.env.SUPER_ADMINS.split(',');
// console.log({super_admins})

const isSuperAdmin = (email) => {
    if (super_admins.includes(email)) {
        return true;
    }
    return false;
}



// Spardha

// Spardha - user
exports.createSpardhaEvent = async (req, res) => {
    try {
        let spardhaEvent = new spardhaScoreModel(req.body);
        await spardhaEvent.save();
        res.json({ "success": true });
    }
    catch (err) {
        res.status(400).json({ "success": false, "message": err.toString() });
    }
};


exports.getEventsScheduled = async (req,res)=>{
    try{
        const query_email = req.query.email;
        if(query_email){
            const events = await spardhaEventModel.find({posterEmail:query_email, resultAdded:false});
            res.status(200).json({ "success": true, "details": events });
        }
        else{
            const events = await spardhaEventModel.find({resultAdded:false});
            res.status(200).json({ "success": true, "details": events });
        }
    }catch(err){
        res.status(401).json({ "success": false, "message": err.toString() });
    }
}

exports.getEventsResult = async (req,res)=>{
    try{
        const query_email = req.query.email;
        if(query_email){
            const events = await spardhaEventModel.find({posterEmail:query_email, resultAdded:true});
            res.status(200).json({ "success": true, "details": events });
        }
        else{
            const events = await spardhaEventModel.find({resultAdded:true});
            res.status(200).json({ "success": true, "details": events });
        }
    }catch(err){
        res.status(401).json({ "success": false, "message": err.toString() });
    }
}


exports.getAllEvents = async (req, res) => {
    const events = await spardhaEventModel.find();
    res.status(200).json({ "success": true, "details": events });
}

// Spardha - admin
exports.addResultSpardha = async (req, res) => {
    try {
        let spardhaEvent = new spardhaScoreModel(req.body);
        await spardhaEvent.save();
        res.json({ "success": true });
    }
    catch (err) {
        res.status(400).json({ "success": false, "message": err.toString() });
    }
};

exports.newEvent = async (req, res) => {
    try {
        const email = req.body.login_email;
        let eventDateTime = new Date(req.body.date);

        const arr = req.body;
        const newEvent = await spardhaEventModel.create({
            event: arr.event,
            stage: arr.stage,
            category: arr.category,
            posterEmail: email,
            eventDateTime: eventDateTime,
            status: arr.status,
            venue: arr.venue,
            hostels: arr.hostels
        })

        if (newEvent) {
            let gcEvents = await gcCompetitionsModel.find();
            let arr = gcEvents[0];
            arr.spardha_events.push(newEvent._id);
            const addToGcEvents = await gcCompetitionsModel.findByIdAndUpdate(arr._id, gcEvents[0]);
            console.log(addToGcEvents);
            if (addToGcEvents) {
                res.status(200).json({ "success": true, "details": newEvent });
            }
            else {
                console.log("error");
            }
        }
    } catch (err) {
        res.status(401).json({ "success": false, "message": err.toString() });
    }
}


exports.addEventDetail = async (req, res) => {
    try {
        const event_id = req.params.id;
        let spardha_event = await spardhaEventModel.findById(event_id);

        if (spardha_event) {
            if (spardha_event.resultAdded === false) {
                let eventDateTime = new Date(req.body.date);
                spardha_event.eventDateTime = eventDateTime;
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

exports.addEventResult = async(req,res)=>{
    try{
        const id = req.params.id;
        const login_email = req.body.login_email;

        const event = await spardhaEventModel.findById(id);

        if(!event){
            throw new Error("Event Not Found")
        }

        else if(event.resultAdded){
            throw new Error("Result Already Added");
        }
        else{
            const details = req.body;
            for(var i = 0; i<details.length; i++){
                
            }
        }
    }catch(err){
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


//Super Admin

exports.addEventAdmin = async (req, res) => {
    try {
        const event = req.query.competition;
        const emails = req.body.emails;

        let array = await gcCompetitionsModel.find();
        let spardha_admins = array[0].spardha_admins;
        let kriti_admins = array[0].kriti_admins;
        let manthan_admins = array[0].manthan_admins;
        let spardha_board_admins = array[0].spardha_board_admins;
        let kriti_board_admins = array[0].kriti_board_admins;
        let manthan_board_admins = array[0].manthan_board_admins;

        for (var i = 0; i < emails.length; i++) {
            let email = emails[i];

            let adminArr = spardha_admins.includes(email) || kriti_admins.includes(email) || manthan_admins.includes(email);

            let board_adminArr = spardha_board_admins.includes(email) || kriti_board_admins.includes(email) || manthan_board_admins.includes(email);

            if ((adminArr || board_adminArr || isSuperAdmin(email))) {
                res.status(401).json({ "success": false, "message": `${email} already existed` });
                return;
            }
            else {

                if (event === "spardha") {
                    spardha_admins.push(email);
                }
                else if (event === "kriti") {
                    kriti_admins.push(email);
                }
                else if (event == "manthan") {
                    manthan_admins.push(email);
                }
            }
        }

        array[0].spardha_admins = spardha_admins;
        array[0].kriti_admins = kriti_admins;
        array[0].manthan_admins = manthan_admins;

        const process = await gcCompetitionsModel.findByIdAndUpdate(array[0]._id, array[0]);

        if (process) {
            res.status(200).json({ "success": true, "message": `users added successfully to ${event} admin` });
            return;
        }

    } catch (err) {
        res.status(401).json({ "success": false, "message": err.toString() });
        return;
    }
}



exports.addBoardAdmin = async (req, res) => {


    try {
        const event = req.query.competition;
        const emails = req.body.emails;

        let array = await gcCompetitionsModel.find();
        let spardha_admins = array[0].spardha_admins;
        let kriti_admins = array[0].kriti_admins;
        let manthan_admins = array[0].manthan_admins;
        let spardha_board_admins = array[0].spardha_board_admins;
        let kriti_board_admins = array[0].kriti_board_admins;
        let manthan_board_admins = array[0].manthan_board_admins;

        for (var i = 0; i < emails.length; i++) {
            let email = emails[i];

            let adminArr = spardha_admins.includes(email) || kriti_admins.includes(email) || manthan_admins.includes(email);

            let board_adminArr = spardha_board_admins.includes(email) || kriti_board_admins.includes(email) || manthan_board_admins.includes(email);

            if ((adminArr || board_adminArr || isSuperAdmin(email))) {
                res.status(401).json({ "success": false, "message": `${email} already existed` });
                return;
            }
            else {

                if (event === "spardha") {
                    spardha_board_admins.push(email);

                }

                else if (event === "kriti") {
                    kriti_board_admins.push(email);

                }
                else if (event == "manthan") {
                    manthan_board_admins.push(email);

                }
            }

        }

        array[0].spardha_board_admins = spardha_board_admins;
        array[0].kriti_board_admins = kriti_board_admins;
        array[0].manthan_board_admins = manthan_board_admins;

        const process = await gcCompetitionsModel.findByIdAndUpdate(array[0]._id, array[0]);

        if (process) {
            res.status(200).json({ "success": true, "message": `users added successfully to ${event} board admin` });
            return;
        }

    } catch (err) {
        res.status(401).json({ "success": false, "message": err.toString() });
        return;
    }
}


// add an email id to spardha/ manthan/ kriti admins list

// exports.addEmailToAdminsList = async(req,res)=>{

// }

