import dotenv from "dotenv";
dotenv.config();

import mongoose from "mongoose";
import express from "express";
import jwt from "jsonwebtoken";
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;
// console.log({super_admins})

export const checkIfModeratorMiddleware = (req,res,next) => {
    if(req.headers["moderator-key"]===process.env.MODERATOR_KEY){
        next();
    }
    else{
        res.status(401).json({"success" : false,"message" : "You are not authorized moderator"});
    }
}

export const checkSuperAdmin = async (req, res, next) => {
    try {
        const email = req.body.email;
        const is_allowed = postAdminsMiddleware(email);
        if(is_allowed){
            next();
        }else{
            throw new Error("You are not authorized super admin")
        }
    } catch (err) {
        res.status(401).json({ "success" : false,"message":  err.toString()});
    }
}