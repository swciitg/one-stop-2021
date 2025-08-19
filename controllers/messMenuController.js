import messMenu from "../models/messMenuModel.js";
import csv from "csvtojson";
import LastUpdate from "../models/lastUpdate.js";
import { uploadFilePath } from "../constants.js";

export const getAllMenuItems = async (req, res) => {
  let menuItems = await messMenu.find();
  res.json({details : menuItems});
};

export const createMessMenu = (req, res) => {
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
        await messMenu.deleteMany({});
        messMenu.insertMany(jsonObj, async (err, data) => {
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
};