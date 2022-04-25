const LostDetails = require("../models/LostModels");
const foundDetails = require("../models/foundModels");
const fs = require("fs");

exports.getLostDetails = async (req, res) => {
  try {
    const details = await LostDetails.find();
    details.sort(compare);
    return res.json({ details: details });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addLostForm = async (req, res) => {
  try {
    return res.render("add_user");
  } catch (error) {
    console.log(error.message);
  }
};

exports.postLostDetails = async (req, res) => {
  try {
    var { title, location, phonenumber, description, link } = req.body;

    //   const image = req.file ? req.file.filename : link;

    //   if (!image) {
    //     console.log("error", "Please attach your pdf!!");
    //     return res.redirect("/Lost/raise");
    //   }
    //console.log(path);
    const newLostDetail = await new LostDetails({
      title,
      location,
      phonenumber,
      description,
      link,
    }).save();
    if (!newLostDetail) {
      res.redirect("/Lost/raise");
    }

    return res.json({ saved_successfully: true });
  } catch (error) {
    console.log(error.message);
    return res.json({ saved_successfully: false });
  }
};

exports.deleteLostDetail = async (req, res) => {
  const id = req.params.details_id;
  LostDetails.findOneAndDelete(id, (err, result) => {
    if (result.link != "") {
      try {
        fs.unlinkSync("./uploads/" + result.link);
      } catch (err) {
        console.log(err);
      }
    }
    if (err) {
      res.json({ message: err.message });
    } else {
      res.redirect(`/Lost`);
    }
  });
};

// found details

exports.getfoundDetails = async (req, res) => {
  try {
    const details = await foundDetails.find();

    return res.json({ details: details });
  } catch (error) {
    console.log(error.message);
  }
};

exports.addfoundForm = async (req, res) => {
  try {
    return res.render("addfound");
  } catch (error) {
    console.log(error.message);
  }
};

exports.postfoundDetails = async (req, res) => {
  // console.log(req.body);
  try {
    var { title, location, submittedat, description, link } = req.body;

    //   const image = req.file ? req.file.filename : link;

    //   if (!image) {
    //     console.log("error", "Please attach your pdf!!");
    //     return res.redirect("/Lost/found");
    //   }
    //console.log(path);
    const newfoundDetail = await new foundDetails({
      title,
      location,
      submittedat,
      description,
      link,
    }).save();
    if (!newfoundDetail) {
      res.redirect("/Lost/found");
    }

    return res.json({ saved_successfully: true });
  } catch (error) {
    console.log(error.message);
    return res.json({ saved_successfully: false });
  }
};

exports.deletefoundDetail = async (req, res) => {
  const id = req.params.details_id;
  foundDetails.findOneAndDelete(id, (err, result) => {
    if (result.link != "") {
      try {
        fs.unlinkSync("./uploads/" + result.link);
      } catch (err) {
        console.log(err);
      }
    }
    if (err) {
      res.json({ message: err.message });
    } else {
      res.redirect(`/Lost`);
    }
  });
};

const compare = (a, b) => {
  return b.date - a.date;
};
