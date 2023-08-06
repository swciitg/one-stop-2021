const messMenu = require("../models/messMenuModel");
// var multiparty = require("multiparty");
// var form = new multiparty.Form();
const csv = require("csvtojson");
const LastUpdate = require("../models/lastUpdate");
// const { csvToMongo } = require("./fileController");
const { uploadFilePath } = require("../constants");
exports.getAllMenuItems = async (req, res) => {
  let menuItems = await messMenu.find();
  console.log(menuItems);
  res.json({details : menuItems});
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
        console.log(jsonObj);
        await messMenu.deleteMany({});
        messMenu.insertMany(jsonObj, async (err, data) => {
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
        },{runValidators: true});
        res.json({
          jsonObj,
          message: "entries saved successfully",
        });
        });
      });

  } catch (err) {
    console.log(err);
  }
  console.log("jkjlsd");
};