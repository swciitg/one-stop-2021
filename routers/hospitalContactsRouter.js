const express = require("express");
const { verifyUserRequest } = require("../middlewares/user.auth");
const { getHospitalContacts } = require("../controllers/hospitalContactController");

const hospitalContactRouter = express.Router();

hospitalContactRouter.get('/hospital/getContacts',verifyUserRequest, getHospitalContacts);

module.exports = hospitalContactRouter;