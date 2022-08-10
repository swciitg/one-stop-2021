const Menu = require("../models/messMenuItem");
var multiparty = require("multiparty");
var form = new multiparty.Form();
const csv = require("csvtojson");
const LastUpdate = require("../models/lastUpdate");
const { csvToMongo } = require("./fileController");

exports.getAllMenuItems = (req, res) => {
  Menu.find()
    .lean()
    .exec(function (err, users) {
      res.send(JSON.stringify(users));
    });
};

exports.createMessMenu = (req, res) => {
  try {
    form.parse(req, function (err, fields, files) {
      console.log(files);
      let hostel = Object.keys(files)[0];
      csv()
        .fromFile(files[hostel][0].path)
        .then((jsonObj) => {
          console.log("its messMenu model");
          console.log(jsonObj[0]["hostel"]);
          Menu.find().then((oldList) => {
            if (oldList.length !== 0) {
              console.log("inside oldlist");
              Menu.deleteMany({ hostel: jsonObj[0]["hostel"] }).then(
                (result) => {
                  Menu.insertMany(jsonObj, (err, data) => {
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
              );
            } else {
              Menu.insertMany(jsonObj, (err, data) => {
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
        });
    });
  } catch (err) {
    console.log(err);
  }
  console.log("jkjlsd");
};

exports.updateMessMenu = (req, res) => {
  const id = req.params.id;
  Menu.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
    (data) => {
      LastUpdate.deleteMany({}).then((da) => {
        new LastUpdate({
          update: new Date(),
        })
          .save()
          .then((dat) => {
            res.json(data);
          });
      });
    }
  );
};

exports.deletemanyMessMenu = (req, res) => {
  const arr = req.body.id;

  if (typeof arr != "string") {
    var arr2 = Object.values(arr);
    for (const id of arr2) {
      Menu.findByIdAndDelete(id).then((data) => {});
      console.log(id);
    }
    LastUpdate.deleteMany({}).then((da) => {
      new LastUpdate({
        update: new Date(),
      })
        .save()
        .then((dat) => {
          res.send({ message: "deleted many" });
        });
    });
  } else {
    Menu.findByIdAndDelete(arr).then((data) => {
      LastUpdate.deleteMany({}).then((da) => {
        new LastUpdate({
          update: new Date(),
        })
          .save()
          .then((dat) => {
            res.send({ message: "deleted one by one" });
          });
      });
    });
  }
};
