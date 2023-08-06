
const LastUpdate = require("../models/lastUpdate");

const transportTiming = require("../models/transportTimings");

exports.getferrytiming = async (req, res) => {
  try {
    let ferryTimings = await transportTiming.find({ type: "FERRY" });

    res.json({
      error: false,
      data: ferryTimings,
    });
  } catch (e) {
    res.json({
      error: true,
      message: e,
    });
  }
};

exports.getbusStop = async (req, res) => {
  try {
    let busTimings = await transportTiming.find({ type: "BUS" });

    res.json({
      error: false,
      data: busTimings,
    });
  } catch (e) {
    res.json({
      error: true,
      message: e,
    });
  }
};
