import jwt from "jsonwebtoken";
import onestopUserModel from "../models/userModel.js";
import { RequestValidationError } from "../errors/request.validation.error.js";
import { AccessTokenError } from "../errors/jwt.auth.error.js";
import { getGuestUserID } from "../controllers/onestopUserController.js";
import { GuestAccessError } from "../errors/guest.access.error.js";
import { UserBlockedError } from "../errors/user.blocked.error.js";
import redis from "../utils/redisClient.js";

const accessjwtsecret = process.env.ACCESS_JWT_SECRET;

export const verifyUserRequest = async (req, res, next) => {
    try {
        if (req.originalUrl.split('/').includes('public')) next();
        console.log(req.originalUrl);
        if (req.headers.authorization === undefined) {
            throw new RequestValidationError("Access token not passed");
        }
        let accessToken = req.headers.authorization.split(' ').slice(-1)[0];
        if (!accessToken) {
            throw new RequestValidationError("Access token not passed");
        }
        let decoded;
        jwt.verify(accessToken, accessjwtsecret, (err, dec) => {
            if (err) {
                throw new AccessTokenError(err.message);
            }
            decoded = dec;
        });

        const key = `user:block:${decoded.userid}`;
        let userCache = await redis.get(key);
        let userData;
        if (userCache) {
            console.log("User found in cache of blocked");
            userData = JSON.parse(userCache);
        } else {
            const user = await onestopUserModel.findById(decoded.userid).lean();
            if (!user) throw new RequestValidationError("Invalid user id found");

            userData = {
                blocked: user.blocked,
                outlookEmail: user.outlookEmail
            };

            await redis.set(key, JSON.stringify(userData), "EX", 86400);
        }

          if (userData.blocked) {
            throw new UserBlockedError("User has been blocked due to spamming");
        }

        req.userid = decoded.userid;
        req.body = req.body || {};
        req.body.email = userData.outlookEmail;

        next();
    } catch (err) {
        console.log(`Unexpected error in verifyUserRequest: ${err}`);
        next(err);
    }
}

export const restrictIfGuest = async (req, res, next) => {
    try {
        // since, verify user request will be checked before this so, token would always be present
        let accessToken = req.headers.authorization.split(' ').slice(-1)[0];
        let decoded;
        jwt.verify(accessToken, accessjwtsecret, (err, dec) => {
            if (err) {
                next(new AccessTokenError(err.message));
            }
            decoded = dec;
        });
        if (decoded.userid === await getGuestUserID()) {
            next(new GuestAccessError("Guest Access not allowed"));
        }
        else next();
    } catch (err) {
        next(err);
    }
}