import LastUpdate from "../models/lastUpdate.js";

export const getLastUpdate = (req, res) => {
  LastUpdate.find().then((data) => {
    res.json(data[0]);
  });
};