const { Response } = require("../../models/habModels/opiResponseModel.js");
const { oneStopUserModel } = require("../../models/userModel.js");
const { opiStartDate, opiEndDate } = require("../../helpers/constants.js");

const createNew = async (req, res) => {
  try {

    // check if OPI is active
    const currentDate = new Date();
    const sDate = new Date(opiStartDate);
    const newopiStartDate = new Date(sDate.setHours(0, 0, 0, 0));
    const eDate = new Date(opiEndDate);
    const newopiEndDate = new Date(eDate.setHours(23, 59, 59, 999));
    
    if (currentDate < newopiStartDate || currentDate > newopiEndDate) {
        return res.status(400).json({ success: false, message: 'OPI is not active' });
    }

    // check if user exists & user's subscribedMess is the same as the one in the request
    const user = await oneStopUserModel.findOne({ outlookEmail: req.body.outlookEmail });
    if (!user) {
        return res.status(400).json({ success: false, message: 'User not found' });
    }

    if (user.subscribedMess !== req.body.subscribedMess) {
        return res.status(400).json({ success: false, message: 'User not subscribed to this mess' });
    }

    // check if user has already submitted a response
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