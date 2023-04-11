const busStop = require("../models/busTiming");
const FerryTiming = require("../models/ferryTiming");
const ferryTiming = require("../models/ferryTiming");
const LastUpdate = require("../models/lastUpdate");

exports.getferrytiming = (req, res) => {
  FerryTiming.find().then((data) => {
    res.json(data);
  });
};

exports.getbusStop = (req, res) => {
  busStop.find().then((data) => {
    console.log(data);
    let jsonData = {};
    data.forEach((element) => {
      jsonData[element["BusStop"]]={"CollegeToCity_WorkingDay" : element["CollegeToCity_WorkingDay"],"CityToCollege_WorkingDay" : element["CityToCollege_WorkingDay"],"CollegeToCity_Holiday":element["CollegeToCity_Holiday"],"CityToCollege_Holiday":element["CityToCollege_Holiday"]}
    })
    res.json(jsonData);
  });
};