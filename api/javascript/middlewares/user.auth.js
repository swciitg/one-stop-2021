const jwt = require("jsonwebtoken");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const onestopUserModel = require("../models/userModel");
const { RequestValidationError } = require("../errors/request.validation.error");
const { AccessTokenError } = require("../errors/jwt.auth.error");
const { getGuestUserID } = require("../controllers/onestopUserController");
const { GuestAccessError } = require("../errors/guest.access.error");

exports.verifyUserRequest = async (req,res,next) => {
    if(req.originalUrl.split('/').includes('public')) next();
    console.log(req.originalUrl);
    let accessToken = req.headers.authorization.split(' ').slice(-1)[0];
    if(!accessToken) throw new RequestValidationError("Access token not passed");
    let decoded;
    jwt.verify(accessToken, accessjwtsecret,(err,dec) => {
        if(err){
            throw new AccessTokenError(err.message);
        }
        decoded=dec;
    });
    if (await onestopUserModel.findById(decoded.userid)!== undefined) {
        req.body.userid = decoded.userid;
        console.log(req.body.userid);
        console.log("Token Verified");
        next();
    }
    else throw new RequestValidationError("invalid user id found");
}

exports.restrictIfGuest = async (req,res,next) => {
    // since, verify user request will be checked before this so, token would always be present
    let accessToken = req.headers.authorization.split(' ').slice(-1)[0];
    let decoded;
    jwt.verify(accessToken, accessjwtsecret,(err,dec) => {
        if(err){
            throw new AccessTokenError(err.message);
        }
        decoded=dec;
    });
    if(decoded.userid === await getGuestUserID()){
        throw new GuestAccessError("Guest Access not allowed");
    }
    next();
}