import foodOutletsModel from "../models/foodOutlets.js";
import LastUpdate from "../models/lastUpdate.js";
import csv from "csvtojson";
import { uploadFilePath } from "../constants.js";

export const createOutlet = (req, res) => {
  try {
    console.log(uploadFilePath);
    csv()
      .fromFile(uploadFilePath)
      .then(async (jsonObj) => {
        console.log(jsonObj);
        jsonObj.forEach((item,index) => {
          let tagsArray = item["tags"].split(",");
          jsonObj[index]["tags"]=tagsArray;
        });
        await foodOutletsModel
              .deleteMany({});
          foodOutletsModel.insertMany(jsonObj, async (err, data) => {
            console.log(jsonObj);
            if (err) {
              console.log(err);
            } else {
              console.log("saved all");
            }
            let updatesList = await LastUpdate.find();
            console.log(updatesList);
            await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
              food: new Date(),
            },{runValidators: true});
            res.send({
              jsonObj,
              message: "entries saved successfully",
            });
          });
      });
  } catch (err) {
    console.log(err);
  }
};

export const getAllOutlets = (req, res) => {
  foodOutletsModel.find().then((data) => {
    res.json(data);
  });
};