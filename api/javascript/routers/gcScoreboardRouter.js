const express = require("express");
const gcScoreboardRouter = express.Router();
const jwt = require("jsonwebtoken");
let jwtsecret = process.env.JWT_SECRET;
const spardhaadmins = process.env.SPARDHA_ADMINS.split(',');
const kritiadmins = process.env.KRITI_ADMINS.split(',');
const manthanadmins = process.env.MANTHAN_ADMINS.split(',');

function checkAdmin(email){
    let authEvents=[];
    if(spardhaadmins.includes(email)) authEvents.push("spardha");
    if(kritiadmins.includes(email)) authEvents.push("kriti");
    if(manthanadmins.includes(email)) authEvents.push("spardha");
    return authEvents;
}

gcScoreboardRouter.use((req,res,next) => {
    console.log(req.originalUrl.split('/').slice(-1)[0]);
    if(req.originalUrl.split('/').slice(-1)[0] !== 'login'){
        if(!req.headers.authorization){
            res.status(401).json({"success" : false});
            return;
        }
        let token = req.headers.authorization.split(' ').slice(-1)[0];
        jwt.verify(token,jwtsecret,(err,decoded) => {
            if(decoded!==undefined && checkAdmin(decoded).length!==0){
                next();
                return;
            }
        })
        res.status(401).json({"success" : false,"message" : "Invalid Token"});
    }
    else next();
});

gcScoreboardRouter.post("/gc/login",(req,res) => {
    try{
        let email = req.body.email;
        let authEvents = checkAdmin(email);
        if(authEvents.length===0){
            res.status(401).json({"message" : "You are not authorized admin"});
            return;
        }
        const accessToken = jwt.sign({"email" : email},jwtsecret,{expiresIn : "1 days"});
        const refreshToken = jwt.sign({"email" : email + "admin"},jwtsecret,{expiresIn : "7 days"});
        res.json({"success" : true, accessToken, refreshToken,authEvents});
    }
    catch(err){
        res.status(500).json({"success" : false, "message" : err.toString()});
    }
});

module.exports = { gcScoreboardRouter };