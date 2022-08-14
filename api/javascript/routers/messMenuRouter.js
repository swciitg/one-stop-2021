const routes = require('../routes');
const express = require("express");
const Controller = require("../controllers/messMenuController");
const messMenuRouter = express.Router();

messMenuRouter.get("/hostelsMessMenu", Controller.getAllMenuItems);
messMenuRouter.post("/createMessMenu", Controller.createMessMenu);

module.exports = {
    messMenuRouter
};