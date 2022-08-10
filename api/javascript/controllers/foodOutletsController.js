const foodOutletsModel = require("../models/foodOutlets");
// const getOutletMenu = require("../middlewares/getOutletMenu")
const LastUpdate = require("../models/lastUpdate");
const csv = require("csvtojson");
var multiparty = require("multiparty");
var form = new multiparty.Form();
exports.createOutlet = (req, res) => {
  try {
    form.parse(req, function (err, fields, files) {
      console.log(files);
      let hostel = Object.keys(files)[0];
      console.log(hostel);
      csv()
        .fromFile(files[hostel][0].path)
        .then((jsonObj) => {
          console.log("its foodOutlets model");
          foodOutletsModel.find().then((oldList) => {
            if (oldList.length !== 0) {
              console.log("inside oldlist");
              foodOutletsModel
                .deleteMany({ hostel: jsonObj[0]["name"] })
                .then((result) => {
                  foodOutletsModel.insertMany(jsonObj, (err, data) => {
                    console.log(jsonObj);
                    if (err) {
                      console.log(err);
                    } else {
                      console.log("saved all");
                    }
                    LastUpdate.deleteMany({}).then((da) => {
                      new LastUpdate({
                        update: new Date(),
                      })
                        .save()
                        .then((dat) => {
                          res.send({
                            jsonObj,
                            message: "entries saved successfully",
                          });
                        });
                    });
                  });
                });
            } else {
              foodOutletsModel.insertMany(jsonObj, (err, data) => {
                console.log(jsonObj);
                if (err) {
                  console.log(err);
                } else {
                  console.log("saved all");
                }
                LastUpdate.deleteMany({}).then((da) => {
                  new LastUpdate({
                    update: new Date(),
                  })
                    .save()
                    .then((dat) => {
                      res.send({
                        jsonObj,
                        message: "entries saved successfully",
                      });
                    });
                });
              });
            }
          });
          // foodOutletsModel.insertMany(jsonObj, (err, data) => {
          //   if (err) {
          //     console.log(err);
          //   } else {
          //     console.log("saved all");
          //   }
          // });
          // res.send({
          //   message: "entries saved successfully",
          // });
        });
    });
  } catch (err) {
    console.log(err);
  }
  console.log("jkjlsd");
  // foodOutletsModel.findOne({ name: req.body.name }).then((outlet) => {
  //   if (outlet) {
  //     // console.log(outlet);
  //     res.send({ message: "Outlet already exits" });
  //   } else {
  //     new foodOutletsModel({
  //       name: req.body.name,
  //       caption: req.body.caption,
  //       closing_time: req.body.closing_time,
  //       waiting_time: req.body.waiting_time,
  //       phone_number: req.body.phone_number,
  //       address: req.body.address,
  //       latitude: req.body.latitude,
  //       longitude: req.body.longitude,
  //       tags: req.body.tags,
  //       menu: req.body.menu,
  //     })
  //       .save()
  //       .then((data) => {
  //         LastUpdate.deleteMany({}).then((da) => {
  //           new LastUpdate({
  //             update: new Date(),
  //           })
  //             .save()
  //             .then((dat) => {
  //               res.json(data);
  //             });
  //         });
  //       });
  //   }
  // });
};

exports.getAllOutlets = (req, res) => {
  foodOutletsModel.find().then((data) => {
    res.json(data);
  });
};

exports.updateOutlet = (req, res) => {
  const id = req.params.id;
  foodOutletsModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      LastUpdate.deleteMany({}).then((da) => {
        new LastUpdate({
          update: new Date(),
        })
          .save()
          .then((dat) => {
            res.json(data);
          });
      });
    });
};

exports.deletemanyOutlets = (req, res) => {
  const arr = req.body.id;

  if (typeof arr != "string") {
    var arr2 = Object.values(arr);
    for (const id of arr2) {
      foodOutletsModel.findByIdAndDelete(id).then((data) => {});
      console.log(id);
      LastUpdate.deleteMany({}).then((da) => {
        new LastUpdate({
          update: new Date(),
        })
          .save()
          .then((dat) => {
            res.send({ message: "deleted many" });
          });
      });
    }
  } else {
    foodOutletsModel.findByIdAndDelete(arr).then((data) => {
      LastUpdate.deleteMany({}).then((da) => {
        new LastUpdate({
          update: new Date(),
        })
          .save()
          .then((dat) => {
            res.send({ message: "deleted one of one" });
          });
      });
    });
  }
};
