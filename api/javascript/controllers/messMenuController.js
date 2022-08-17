const Menu = require("../models/messMenuItem");
// var multiparty = require("multiparty");
// var form = new multiparty.Form();
const csv = require("csvtojson");
const LastUpdate = require("../models/lastUpdate");
// const { csvToMongo } = require("./fileController");
const {uploadFilePath} = require("../constants");
exports.getAllMenuItems = (req, res) => {
  Menu.find()
    .lean()
    .exec(function (err, users) {
      res.send(JSON.stringify(users));
    });
};

exports.createMessMenu = (req, res) => {
  try {
    // console.log("test1")
    // const files = req.files;
    // const fields = req.fields
    // console.log("Files", req.files);

    // console.log("fields", req.fields);
    // console.log("parse");
    // let hostel = Object.keys(files)[0];
    csv()
      .fromFile(uploadFilePath)
      .then(async (jsonObj) => {
        console.log("its messMenu model");
        console.log(jsonObj[0]["hostel"]);
        Menu.find().then((oldList) => {
          if (oldList.length !== 0) {
            console.log("inside oldlist");
            Menu.deleteMany({
              hostel: jsonObj[0]["hostel"]
            }).then(
              (result) => {
                Menu.insertMany(jsonObj, async (err, data) => {
                  // console.log(jsonObj);
                  if (err) {
                    console.log(err);
                  } else {
                    console.log("saved all");
                  }
                  let updatesList = await LastUpdate.find();
                  // console.log(updatesList);
                  await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
                    menu: new Date(),
                  });
                  res.send({
                    jsonObj,
                    message: "entries saved successfully",
                  });
                });
              }
            );
          } else {
            Menu.insertMany(jsonObj, async (err, data) => {
              // console.log(jsonObj);
              if (err) {
                console.log(err);
              } else {
                console.log("saved all");
              }
              let updatesList = await LastUpdate.find();
              // console.log(updatesList);
              await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
                menu: new Date(),
              });
              res.send({
                jsonObj,
                message: "entries saved successfully",
              });
            });
          }
        });
      });

  } catch (err) {
    console.log(err);
  }
  console.log("jkjlsd");
};