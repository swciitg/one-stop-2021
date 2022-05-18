const LostModel = require("../models/LostModel");
const foundModel = require("../models/foundModel");
const fs = require("fs");
const { ImgurClient } = require('imgur');
const client = new ImgurClient({ clientId: process.env.IMGUR_CLIENT_ID });
const path = require("path");
const deepai = require('deepai');
const uuid = require("uuid");
deepai.setApiKey(process.env.NSFW_API_KEY.toString());

exports.getLostDetails = async (req, res) => {
  try {
    const details = await LostModel.find();
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
  // if (!req.files) {
  //   return res.json({ saved_successfully: false ,status : "No file recieved"});
  //   return;
  // }
  // const file = req.files.imageToUpload;
  try {
    var { title, location, phonenumber, description, imageString} = req.body;
    // console.log(title);
    // console.log(location);
    // console.log(phonenumber);
    // console.log(description);
    // console.log(link);
    //console.log(uuid.v4());
    
    //   const image = req.file ? req.file.filename : link;

    //   if (!image) {
    //     console.log("error", "Please attach your pdf!!");
    //     return res.redirect("/Lost/raise");
    //   }
    //console.log(path);
    const imageName = uuid.v4();
    const imagePath = path.resolve(__dirname + "/../" + "image_save_folder" + "/" + imageName+".jpg");
    console.log(imagePath);

    fs.writeFileSync(imagePath,Buffer.from(imageString,"base64"));
    const response = await client.upload({
      image: fs.createReadStream(imagePath),
      type: 'stream',
    });
    console.log(response.data);
    const photo_id = response.data.id;
    const imageURL = response.data.link;
    //const imageURL = "https://femefun.com/contents/videos_screenshots/50000/50719/preview.mp4.jpg";

    var safeToUseResp = await deepai.callStandardApi("nsfw-detector", {
      image: imageURL,
    });
    if(safeToUseResp.output.nsfw_score > 0.1){
      res.json({"saved_successfully" : false, "image_safe" : false});
      return;
    }
    //res.json({recieved_data : true, saved_image : true});

    const newLostDetail = await new LostModel({
      title,
      location,
      phonenumber,
      description,
      photo_id,
      imageURL
    }).save().then((result) => {
      console.log(result);
    });
    fs.unlinkSync(imagePath);
    // if (!newLostDetail) {
    //   res.redirect("/Lost/raise");
    // }

    return res.json({ saved_successfully: true, "image_safe" : true});
  } catch (error) {
    console.log(error.message);
    return res.json({ saved_successfully: false,"image_safe" : true });
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
    const details = await foundModel.find();

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
    var { title, location, submittedat, description, imageString } = req.body;

    //   const image = req.file ? req.file.filename : link;

    //   if (!image) {
    //     console.log("error", "Please attach your pdf!!");
    //     return res.redirect("/Lost/found");
    //   }
    //console.log(path);

    const imageName = uuid.v4();
    const imagePath = path.resolve(__dirname + "/../" + "image_save_folder" + "/" + imageName+".jpg");
    console.log(imagePath);

    fs.writeFileSync(imagePath,Buffer.from(imageString,"base64"));
    const response = await client.upload({
      image: fs.createReadStream(imagePath),
      type: 'stream',
    });
    console.log(response.data);
    const photo_id = response.data.id;
    const imageURL = response.data.link;
    //const imageURL = "https://femefun.com/contents/videos_screenshots/50000/50719/preview.mp4.jpg";

    var safeToUseResp = await deepai.callStandardApi("nsfw-detector", {
      image: imageURL,
    });
    if(safeToUseResp.output.nsfw_score > 0.1){
      res.json({"saved_successfully" : false, "image_safe" : false});
      return;
    }

    const newfoundDetail = await new foundModel({
      title,
      location,
      submittedat,
      description,
      photo_id,
      imageURL
    }).save();
    fs.unlinkSync(imagePath);
    // if (!newfoundDetail) {
    //   res.redirect("/Lost/found");
    // }

    return res.json({ saved_successfully: true,"image_safe" : true });
  } catch (error) {
    console.log(error.message);
    return res.json({ saved_successfully: false,"image_safe" : false });
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
