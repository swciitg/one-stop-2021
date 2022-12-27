const express = require("express");
const gcScoreboardRouter = express.Router();
const jwt = require("jsonwebtoken");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;
console.log(accessjwtsecret,refreshjwtsecret);

const {gcCompetitionsModel} = require("../models/gcScoreboardModel");

const super_admins = process.env.SUPER_ADMINS.split(',');
// console.log({super_admins})

const isSuperAdmin = (email) => {
    if (super_admins.includes(email)) {
        return true;
    }
    return false;
}


async function checkAdmin(email) {
    let authEvents = [];

    const array = await gcCompetitionsModel.find();
    const spardha_admins = array[0].spardha_admins;
    const spardha_board_admins = array[0].spardha_board_admins;


    if (spardha_admins.includes(email)) authEvents.push("spardha");
    if (spardha_board_admins.includes(email)) authEvents.push("spardha");
    
    if(isSuperAdmin(email)){
        authEvents.push("super-admin");
    }

    return authEvents;
}


exports.spardhaMiddleware = async (req,res,next)=>{
    try{
        const email = req.body.login_email;
        const authEvents = await checkAdmin(email);

        if(authEvents.length !== 0){
            next();
        }
        else{
            throw new Error("You are not authorized admin or spardha admin");
        }
        
    } catch (err) {
        res.status(401).json({ "success" : false,"message":  err.toString()});
    }
}