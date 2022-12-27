const express = require("express");
const gcScoreboardRouter = express.Router();
const jwt = require("jsonwebtoken");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;
console.log(accessjwtsecret,refreshjwtsecret);

const {gcCompetitionsModel} = require("../models/gcScoreboardModel");



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


exports.gcScoreboard = (async (req, res, next) => {
    try {
        let subPoints = req.originalUrl.split('/');
        if (subPoints.includes('login') === false && subPoints.includes('gen-accesstoken') === false) {
            if (!req.headers.authorization) {
                throw new Error("No Token Found");
            }
            let token = req.headers.authorization.split(' ').slice(-1)[0];
            let decoded = jwt.verify(token, accessjwtsecret);
            if (subPoints.includes('admin')) {
                const adminArray = await checkAdmin(decoded["email"]);
                const adminBoardArray = await checkBoardAdmin(decoded["email"]);
                if (decoded["email"] !== undefined && (adminArray.length !== 0 || adminBoardArray.length!==0 ) || isSuperAdmin(decoded["email"])) {
                    req.body["login_email"] = decoded["email"];
                    console.log("email from first = ", req.body.login_email);
                    next();
                }
                else {
                    throw new Error("You are not authorized admin");
                }
            }
            else if (decoded["email"] !== undefined) {

                
                    req.body["login_email"] = decoded["email"];
                next();
            }
        }
        else next();
    }
    catch (err) {
        res.status(401).json({ "success" : false,"message":  err.toString()});
    }
});