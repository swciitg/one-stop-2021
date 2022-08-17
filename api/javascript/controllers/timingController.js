const FerryTiming = require("../models/ferryTiming");
const BusTiming = require("../models/busTiming");
const busTiming = require("../models/busTiming");
const ferryTiming = require("../models/ferryTiming");
const timeModel = require("../models/timeModel");
const LastUpdate = require("../models/lastUpdate");
exports.createferrytiming = async (req, res) => {
  try {
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    console.log(req.body);
    const record = await ferryTiming.find({
      name: req.body.name
    });
    if (record) {
      await ferryTiming.deleteMany({
        name: req.body.name
      });
    }
    new FerryTiming({
      MonToFri_GuwahatiToNorthGuwahati: req.body.MonToFri_GuwahatiToNorthGuwahati,
      MonToFri_NorthGuwahatiToGuwahati: req.body.MonToFri_NorthGuwahatiToGuwahati,
      Sunday_GuwahatiToNorthGuwahati: req.body.Sunday_GuwahatiToNorthGuwahati,
      Sunday_NorthGuwahatiToGuwahati: req.body.Sunday_NorthGuwahatiToGuwahati,
      name: req.body.name,
    }).save();
    let updatesList = await LastUpdate.find();
    console.log(updatesList);
    await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
      travel: new Date(),
    });
    console.log("gelo");
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
    });
  }
};

exports.getferrytiming = (req, res) => {
  console.log("gkjdklfgj");
  FerryTiming.find().then((data) => {
    res.json(data);
  });
};

exports.createbustiming = async (req, res) => {
  try {
    console.log(req.body);
    const record = await busTiming.find();
    if (record) {
      await busTiming.deleteMany({});
    }
    if (!req.body) {
      res.status(400).send({
        message: "Content can not be empty!"
      });
      return;
    }
    new BusTiming({
      CollegeToCity_WorkingDay: req.body.CollegeToCity_WorkingDay,
      CityToCollege_WorkingDay: req.body.CityToCollege_WorkingDay,
      CollegeToCity_Holiday: req.body.CollegeToCity_Holiday,
      CityToCollege_Holiday: req.body.CityToCollege_Holiday,
      name: req.body.name,
    }).save();
    let updatesList = await LastUpdate.find();
    console.log(updatesList);
    await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
      travel: new Date(),
    });
    console.log("gelo");
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
    });
  }
};

exports.getbustiming = (req, res) => {
  BusTiming.find().then((data) => {
    res.json(data[0]);
  });
};