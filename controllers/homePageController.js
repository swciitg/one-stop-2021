const homePage = require("../models/homePageModel");

exports.getHomePageData = (req, res) => {
  homePage
    .find()
    .then((data) => {
      let quickLinks  = data[0].quickLinks;
      quickLinks.sort((a, b) => a.priorityNumber - b.priorityNumber);
      let response = { homeImageUrl : data[0].clickableImageRedirectUrl };
      quickLinks = quickLinks.map((item) => {
        return {
          "name": item.title,
          "icon": item.logo,
          "link": item.url
        }
      });
      res.json({ ...response, quickLinks });
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