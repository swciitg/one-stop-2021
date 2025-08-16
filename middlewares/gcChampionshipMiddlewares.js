import express from "express";
import { checkIfAdmin, checkIfBoardAdmin } from "../helpers/gcScoreboardHelpers.js";

export const gcRequestsMiddleware = async (req, res, next) => {
    let isProdEnv = process.env.NODE_ENV === 'production';
    let index = isProdEnv ? 5 : 6;
    try {
        const email = req.body.email;
        // console.log(req);
        // console.log(req["parsedUrl"]);
        const competition = req.originalUrl.split('/')[index];
        console.log(email, competition);
        if (await checkIfAdmin(email, competition) || await checkIfBoardAdmin(email, competition)) { // check if he is any of admin/board_admin for the competition
            next();
        }
        else {
            throw new Error("You are not authorized admin or board admin");
        }

    } catch (err) {
        res.status(401).json({ "success": false, "message": err.toString() });
    }
}