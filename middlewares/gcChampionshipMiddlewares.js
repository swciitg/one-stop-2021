const express = require("express");
const { checkIfAdmin, checkIfBoardAdmin } = require("../helpers/gcScoreboardHelpers");

exports.gcRequestsMiddleware = async (req,res,next)=>{
    try{
        const email = req.body.email;
        // console.log(req);
        // console.log(req["parsedUrl"]);
        const parts = req.originalUrl.split('/');

        let competition = null;

        for (let i = 0; i < parts.length; i++) {
            if (parts[i] === 'gc' && i+1 < parts.length) {
                competition = parts[i + 1];
                break;
            }
        }

        if(!competition)
        {
            console.log("Competition not found");
        }

        console.log(email,competition);
        if(await checkIfAdmin(email,competition) || await checkIfBoardAdmin(email,competition)){ // check if he is any of admin/board_admin for the competition
            next();
        }
        else{
            throw new Error("You are not authorized admin or board admin");
        }
        
    } catch (err) {
        res.status(401).json({ "success" : false,"message":  err.toString()});
    }
}