const onestopUserModel = require("../models/userModel");


exports.createOnestopUser = async (req, res) => {
  console.log(req.body.email);
  console.log(req.body["email"]);
  console.log(req.body.name);
  console.log(req.body.deviceToken);
  console.log(req.body.password);
  if (!req.body.email || !req.body.name || !req.body.deviceToken || !req.body.password) {
    res.json({
      success: false,
      message: "missing fields",
    });
  } else {
    try {
      console.log(req.body);
      let onestopuser = await onestopUserModel.findOne({"email" : req.body.email});
      console.log(onestopuser);
      if(onestopuser){
        if(!onestopuser.deviceTokens.includes(req.body.deviceToken)){
          onestopuser.deviceTokens.push(req.body.deviceToken);
        }
      }
      else{
        onestopuser = new onestopUserModel(req.body);
        onestopuser.deviceTokens.push(req.body.deviceToken);
      }
      await onestopuser.save();
      res.json({success: true,message: onestopuser.toJSON()});
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
  console.log(req.body);
  if (!req.body.email || !req.body.deviceToken) {
    res.json({
      success: false,
      message: "missing fields",
    });
  }
  else{
    try{
      let onestopuser = await onestopUserModel.findOne({"email" : req.body.email});
      console.log(onestopuser);
      if(onestopuser){
        if(!onestopuser.deviceTokens.includes(req.body.deviceToken)){
          var index = onestopuser.deviceTokens.indexOf(req.body.deviceToken);
          onestopuser.deviceTokens.splice(index, 1);
          await onestopuser.save();
          res.json({
            success: true,
            message: "Logout Successfully"
          });
        }
        else{
          res.status(400).json({
            success: false,
            message: "device token wrong"
          });
        }
      }
      else{
        res.status(400).json({
          success: false,
          message: "non user found"
        });
      }
    } catch (e) {
      console.log(e);
      res.status(500).json({
        success: false,
        message: e
      });
    }
  }
}
