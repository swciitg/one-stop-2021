const FerryTiming = require('../models/ferryTiming');
const BusTiming = require('../models/busTiming');

exports.createferrytiming = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  new FerryTiming({
    MonToFri_GuwahatiToNorthGuwahati: req.body.MonToFri_GuwahatiToNorthGuwahati,
    MonToFri_NorthGuwahatiToGuwahati: req.body.MonToFri_NorthGuwahatiToGuwahati,
    Sunday_GuwahatiToNorthGuwahati: req.body.Sunday_GuwahatiToNorthGuwahati,
    Sunday_NorthGuwahatiToGuwahati: req.body.Sunday_NorthGuwahatiToGuwahati,
  }).save();
};

exports.getferrytiming = (req, res) => {
  FerryTiming.find().then((data) => {
    res.json(data);
  });
};
exports.updateferrytiming = (req, res) => {
  const { id } = req.params;
  FerryTiming.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update data with ${id}. Maybe data not found!` });
      } else {
        res.send(data);
      }
    });
};

exports.deleteferrytiming = (req, res) => {
  const { id } = req.params;

  FerryTiming.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: 'Data was deleted successfully!',
        });
      }
    });
};

exports.createbustiming = (req, res) => {
  if (!req.body) {
    res.status(400).send({ message: 'Content can not be empty!' });
    return;
  }
  new BusTiming({
    CollegeToCity_WorkingDay: req.body.CollegeToCity_WorkingDay,
    CityToCollege_WorkingDay: req.body.CityToCollege_WorkingDay,
    CollegeToCity_Holiday: req.body.CollegeToCity_Holiday,
    CityToCollege_Holiday: req.body.CityToCollege_Holiday,
  }).save();
};

exports.getbustiming = (req, res) => {
  BusTiming.find().then((data) => {
    res.json(data);
  });
};
exports.updatebustiming = (req, res) => {
  const { id } = req.params;
  BusTiming.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update data with ${id}. Maybe data not found!` });
      } else {
        res.send(data);
      }
    });
};

exports.deletebustiming = (req, res) => {
  const { id } = req.params;

  BusTiming.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: 'Data was deleted successfully!',
        });
      }
    });
};
