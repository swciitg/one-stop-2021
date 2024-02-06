const homePage = require("../models/homePageModel");


exports.getHomePageData = (req, res) => {
    homePage
      .find()
      .then((data) => {
        res.json(data);
      })
      .catch((err) => {
        console.log(err);
        res.status(500).json({
          "message": err.message || "Error Occurred",
        });
    });
};