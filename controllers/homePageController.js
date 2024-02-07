const homePage = require("../models/homePageModel");

exports.getHomePageData = (req, res) => {
  homePage
    .find()
    .then((data) => {
      if(data[0].clickableImageRedirectUrl === undefined || data[0].clickableImageRedirectUrl === null || data[0].clickableImageRedirectUrl === ""){
        res.json({homeImageUrl : ""});
      }else{
        res.json({homeImageUrl : data[0].clickableImageRedirectUrl});
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        "message": err.message || "Error Occurred",
      });
  });
}

exports.getQuickLinksData = (req, res) => {
  homePage
    .find()
    .then((data) => {
      data = data[0].quickLinks;
      data.sort((a, b) => a.priorityNumber - b.priorityNumber);
      data = data.map((item) => {
        return {
          "name": item.title,
          "icon": item.logo,
          "link": item.url
        }
      });
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        "message": err.message || "Error Occurred",
      });
  });
};