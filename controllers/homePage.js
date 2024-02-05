const homePage = require("../models/homePage");

exports.homePage = async (req, res) => {
    try {
      const details = await homePage.find();
      return res.json({
        details: details
      });
    } catch (error) {
      console.log(error.message);
    }
  };