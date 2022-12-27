const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");
const express = require("express");
const jwt = require("jsonwebtoken");
const accessjwtsecret = process.env.ACCESS_JWT_SECRET;
const refreshjwtsecret = process.env.REFRESH_JWT_SECRET;

const super_admins = process.env.SUPER_ADMINS.split(',');
// console.log({super_admins})

const isSuperAdmin = (email) => {
    if (super_admins.includes(email)) {
        return true;
    }
    return false;
}


exports.checkSuperAdmin = async (req, res, next) => {
    try {
        const email = req.body.login_email;
        console.log("email = ", email);
        const is_allowed = isSuperAdmin(email);
        if(is_allowed){
            next();
        }else{
            throw new Error("You are not authorized super admin")
        }
    } catch (err) {
        res.status(401).json({ "success" : false,"message":  err.toString()});
    }
}