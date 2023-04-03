const onestopUserModel = require("../models/onestopUserModel");

exports.createOnestopUser = async (req, res) => {
  if (!req.body.email || !req.body.name || !req.body.deviceToken) {
    res.json({
      success: false,
      message: "missing fields",
    });
  } else {
    try {
      onestopUser = new onestopUserModel(req.body);
      let filter = { email: req.body.email };
      if (await onestopUserModel.findOne(filter)) {
        let data = await onestopUserModel.findOneAndUpdate(filter, req.body, {
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
