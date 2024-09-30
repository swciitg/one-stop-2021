const { Response } = require("../../models/habModels/opiResponseModel.js");
const { oneStopUserModel } = require("../../models/userModel.js");
const { HabAdmin } = require("../../models/habModels/habAdminModel.js");
const moment = require('moment-timezone');

const createNew = async (req, res) => {
  try {
    console.log("This is running...");

    // Fetch opiStartDate and opiEndDate from HabAdmin
    const admin = await HabAdmin.findOne();

    if (!admin) {
      return res.status(500).json({ success: false, message: "Admin settings not found" });
    }

    const { opiStartDate, opiEndDate } = admin;

    // Get current date in the desired timezone (e.g., 'Asia/Kolkata' for IST)
    const currentDate = moment.tz(new Date(), 'Asia/Kolkata');

    const newopiStartDate = moment.tz(opiStartDate, 'Asia/Kolkata').startOf('day'); // 00:00:00
    const newopiEndDate = moment.tz(opiEndDate, 'Asia/Kolkata').endOf('day'); // 23:59:59

    // Check if the current date is within the OPI active period
    if (currentDate.isBefore(newopiStartDate) || currentDate.isAfter(newopiEndDate)) {
      return res.status(400).json({ success: false, message: 'OPI is not active' });
    }

    // Check if user exists & user's subscribedMess is the same as the one in the request
    const user = await oneStopUserModel.findOne({ outlookEmail: req.body.outlookEmail });

    // const user = { subscribedMess: req.body.subscribedMess };
    if (!user) {
      return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (user.subscribedMess !== req.body.subscribedMess) {
      return res.status(400).json({ success: false, message: 'User not subscribed to this mess' });
    }

    // Check if user has already submitted a response
    const outlookEmail = req.body.outlookEmail;
    const userCheck = await Response.findOne({ outlookEmail });

    if (userCheck) {
      return res.status(400).json({ success: false, message: 'User already submitted a response' });
    }

    await Response.create({
      outlookEmail: req.body.outlookEmail,
      subscribedMess: req.body.subscribedMess,
      satisfaction: req.body.satisfaction,
      opiComments: req.body.opiComments,
    });

    res.status(201).json({ success: true, message: "OPI Response accepted" });

  } catch (error) {
    res.status(500).json({ success: false, message: 'Internal Server Error', error: error.message });
  }
};

module.exports = {
  createNew,
};