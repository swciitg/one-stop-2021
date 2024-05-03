const jwt = require("jsonwebtoken");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const onestopUserModel = require("../models/userModel");
const { RequestValidationError } = require("../errors/request.validation.error");
const { AccessTokenError } = require("../errors/jwt.auth.error");
const { getGuestUserID } = require("../controllers/onestopUserController");
const { GuestAccessError } = require("../errors/guest.access.error");
const { UserBlockedError } = require("../errors/user.blocked.error");

exports.verifyUserRequest = async (req,res,next) => {
    try{
        if(req.originalUrl.split('/').includes('public')) next();
        console.log(req.originalUrl);
        if(req.headers.authorization === undefined){
            throw new RequestValidationError("Access token not passed");
        }
        let accessToken = req.headers.authorization.split(' ').slice(-1)[0];
        if(!accessToken) {
            throw new RequestValidationError("Access token not passed");
        }
        let decoded;
        jwt.verify(accessToken, accessjwtsecret,(err,dec) => {
            if(err){
                throw new AccessTokenError(err.message);
            }
            decoded=dec;
        });
        console.log(decoded);
        let onestopUser = await onestopUserModel.findById(decoded.userid);
        if (onestopUser !== undefined && !onestopUser.blocked) {
            console.log(decoded);
            req.userid = decoded.userid;
            req.body.email=onestopUser.outlookEmail;
            console.log(req.userid);
            console.log("Token Verified");
            next();
        }
        else if(onestopUser !== undefined && onestopUser.blocked){
            throw new UserBlockedError("user has been blocked due to spamming");
        }
        else throw new RequestValidationError("invalid user id found");
    }catch(err){
        next(err);
    }
}

exports.restrictIfGuest = async (req,res,next) => {
    try {
        // since, verify user request will be checked before this so, token would always be present
        let accessToken = req.headers.authorization.split(' ').slice(-1)[0];
        let decoded;
        jwt.verify(accessToken, accessjwtsecret,(err,dec) => {
            if(err){
                next(new AccessTokenError(err.message));
            }
            decoded=dec;
        });
        if(decoded.userid === await getGuestUserID()){
            next(new GuestAccessError("Guest Access not allowed"));
        }
        else next();
    } catch (err) {
        next(err);
    }
}