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
    await ferryTiming.deleteMany({name: req.body.name});
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

exports.deleteFerryStop = async (req,res) => {
  console.log(req.body);
  await ferryTiming.deleteMany({name: req.body.name});
  res.json({success : true});
}

exports.deleteAllFerryStop = async (req,res) => {
  console.log(req.body);
  await ferryTiming.deleteMany({});
  await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
    travel: new Date(),
  });
  res.json({success : true});
}

exports.getferrytiming = (req, res) => {
  FerryTiming.find().then((data) => {
    res.json(data);
  });
};

exports.createbustiming = async (req, res) => {

  try {
    await busTiming.deleteMany({BusStop: req.body.name});
    new BusTiming({
      CollegeToCity_WorkingDay: req.body.CollegeToCity_WorkingDay,
      CityToCollege_WorkingDay: req.body.CityToCollege_WorkingDay,
      CollegeToCity_Holiday: req.body.CollegeToCity_Holiday,
      CityToCollege_Holiday: req.body.CityToCollege_Holiday,
      BusStop: req.body.name,
    }).save();
    let updatesList = await LastUpdate.find();
    console.log(updatesList);
    await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
      travel: new Date(),
    });
    return res.status(200).json({
      success: true,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
    });
  }
};

exports.deleteBusStop = async (req,res) => {
  console.log(req.body);
  await busTiming.deleteMany({BusStop: req.body.name});
  await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
    travel: new Date(),
  });
  res.json({success : true});
}

exports.deleteAllBusStop = async (req,res) => {
  console.log(req.body);
  await busTiming.deleteMany({});
  await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
    travel: new Date(),
  });
  res.json({success : true});
}

exports.getbustiming = (req, res) => {
  BusTiming.find().then((data) => {
    console.log(data);
    let jsonData = {};
    data.forEach((element) => {
      jsonData[element["BusStop"]]={"CollegeToCity_WorkingDay" : element["CollegeToCity_WorkingDay"],"CityToCollege_WorkingDay" : element["CityToCollege_WorkingDay"],"CollegeToCity_Holiday":element["CollegeToCity_Holiday"],"CityToCollege_Holiday":element["CityToCollege_Holiday"]}
    })
    res.json(jsonData);
  });
};