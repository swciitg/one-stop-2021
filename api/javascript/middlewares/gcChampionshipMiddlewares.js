const express = require("express");
const { checkIfAdmin, checkIfBoardAdmin } = require("../helpers/gcScorebaordHelpers");

exports.gcRequestsMiddleware = async (req,res,next)=>{
    try{
        const email = req.body.email;
        // console.log(req);
        // console.log(req["parsedUrl"]);
        const competition = req.originalUrl.split('/')[4];
        if(await checkIfAdmin(email,competition) || await checkIfBoardAdmin(email,competition)){ // check if he is any of admin/board_admin for the competition
            next();
        }
        else{
            throw new Error("You are not authorized admin or board admin");
        }
        
    } catch (err) {
        res.status(403).json({ "success" : false,"message":  err.toString()});
    }
}