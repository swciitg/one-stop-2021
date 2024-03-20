const express = require("express");
const router = express.Router();
const { restrictIfGuest, verifyUserRequest } = require("../middlewares/user.auth");

//let formData = require('../backend/exitmodel');
const Controller = require("../controllers/khokhaExitController")

router.patch("/khokha/:id",verifyUserRequest,restrictIfGuest,Controller.updateNewsItem);
router.post("/khokhaexit",verifyUserRequest,restrictIfGuest,Controller.addEntry);
router.get("/khokhaitems",verifyUserRequest,restrictIfGuest,Controller.getItem);

module.exports = router ;