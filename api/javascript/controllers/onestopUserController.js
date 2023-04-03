const { userModel } = require("../models/onestopUserModel");

exports.createOnestopUser = async (req, res) => {
  console.log(req.body.email);
  console.log(req.body["email"]);
  console.log(req.body.name);
  console.log(req.body.deviceToken);
  if (!req.body.email || !req.body.name || !req.body.deviceToken) {
    res.json({
      success: false,
      message: "missing fields",
    });
  } else {
    try {
      let onestopUser = new userModel(req.body);
      let filter = { email: req.body.email };
      let 
      if (await userModel.findOne(filter)) {
        let data = await userModel.findOneAndUpdate(filter, req.body, {
          new: true,
        });
        res.send({
          success: true,
          message: "User updated succesfully",
          data: data,
        });
      } else {
        let data = await onestopUser.save();
        res.send({
          success: true,
          message: "User created succesfully",
          data: data,
        });
      }
    } catch (e) {
      console.log(e);
      res.json({
        success: false,
        message: e,
      });
    }
  }
};

exports.logoutUser = async (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.deviceToken) {
    res.json({
      success: false,
      message: "missing fields",
    });
  }
}
