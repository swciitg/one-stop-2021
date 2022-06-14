const LostModel = require("../models/LostModel");
const foundModel = require("../models/foundModel");
const fs = require("fs");
const path = require("path");
const deepai = require('deepai');
const uuid = require("uuid");
const sharp = require("sharp");
deepai.setApiKey(process.env.NSFW_API_KEY.toString());


function errorFxn (res,err){
  console.log(err);
  return res.json({ saved_successfully: false, "image_safe": true });
}

exports.getImage = async (req, res) => {
  console.log("Get image par");
  const imagePath = path.resolve(__dirname + "/../" + "image_save_folder" + "/" + req.query.photo_id + "-compressed.jpg");
  console.log(imagePath);
  res.sendFile(imagePath);
}

exports.getCompressedImage = async (req, res) => {
  console.log("Get image par");
  const imagePath = path.resolve(__dirname + "/../" + "image_save_folder" + "/" + req.query.photo_id + "-ultracompressed.jpg");
  console.log(imagePath);
  res.sendFile(imagePath);
}

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
    // console.log(req);
    var { title, location, phonenumber, description, imageString, email, username } = req.body;
    console.log(title);
    console.log(location);
    console.log(phonenumber);
    console.log(description);
    // console.log(imageString);
    //console.log(uuid.v4());

    //   const image = req.file ? req.file.filename : link;

    //   if (!image) {
    //     console.log("error", "Please attach your pdf!!");
    //     return res.redirect("/Lost/raise");
    //   }
    const imageName = uuid.v4();
    const imagePath = path.resolve(__dirname + "/../" + "image_save_folder" + "/" + imageName + ".jpg");
    console.log(imagePath);
    fs.writeFileSync(imagePath, Buffer.from(imageString, "base64"), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
    try {
      const metadata = await sharp(imagePath).metadata();
      console.log(metadata);
      const photo_id = imageName;
      const imageURL = "https://swc.iitg.ac.in/onestopapi/getImage?photo_id=" + imageName;
      const compressedImageURL = "https://swc.iitg.ac.in/onestopapi/getCompressedImage?photo_id=" + imageName;
      const newImagePath = path.resolve(__dirname + "/../" + "image_save_folder" + "/" + imageName + "-compressed.jpg");
      const compressedImagePath = path.resolve(__dirname + "/../" + "image_save_folder" + "/" + imageName + "-ultracompressed.jpg");
      //const imageURL = "https://femefun.com/contents/videos_screenshots/50000/50719/preview.mp4.jpg";
      try {
        await sharp(imagePath)
          .resize({
            width: Math.floor(metadata.width/2),
            height: Math.floor(metadata.height/2)
          })
          .withMetadata()
          .toFormat("jpg", { mozjpeg: true })
          .toFile(newImagePath);
        await sharp(imagePath)
          .resize({
            width: Math.floor(metadata.width>5 ? metadata.width/5 : metadata.width),
            height: Math.floor(metadata.height>5 ? metadata.height/5 : metadata.height)
          })
          .withMetadata()
          .toFormat("jpg", { mozjpeg: true })
          .toFile(compressedImagePath);
        console.log("Here 1");
        fs.unlinkSync(imagePath);
        console.log("Here 2");
        var safeToUseResp = await deepai.callStandardApi("nsfw-detector", {
          image: imageURL,
        });
        if (safeToUseResp.output.nsfw_score > 0.1) {
          res.json({ "saved_successfully": false, "image_safe": false });
          return;
        }
        const newLostDetail = await new LostModel({
          title,
          location,
          phonenumber,
          description,
          photo_id,
          imageURL,
          compressedImageURL,
          email,
          username
        }).save().then((result) => {
          console.log(result);
        });
        return res.json({ saved_successfully: true, "image_safe": true });
      } catch (error){return errorFxn(res,error)};
    } catch (error){return errorFxn(res,error)};
  } catch (error){return errorFxn(res,error)};
};

exports.deleteLosts = async (req, res) => {
  await LostModel.remove();
  res.send("Deleted Successfully");
};

// found details

exports.getfoundDetails = async (req, res) => {
  try {
    const details = await foundModel.find();
    details.sort(compare);
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
    var { title, location, submittedat, description, imageString, email, username } = req.body;
    const imageName = uuid.v4();
    const imagePath = path.resolve(__dirname + "/../" + "image_save_folder" + "/" + imageName + ".jpg");
    console.log(imagePath);

    fs.writeFileSync(imagePath, Buffer.from(imageString, "base64"), (err) => {
      if (err)
        console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
    
    try {
      const metadata = await sharp(imagePath).metadata();
      console.log(metadata);
      const photo_id = imageName;
      const imageURL = "https://swc.iitg.ac.in/onestopapi/getImage?photo_id=" + imageName;
      const compressedImageURL = "https://swc.iitg.ac.in/onestopapi/getCompressedImage?photo_id=" + imageName;
      const newImagePath = path.resolve(__dirname + "/../" + "image_save_folder" + "/" + imageName + "-compressed.jpg");
      const compressedImagePath = path.resolve(__dirname + "/../" + "image_save_folder" + "/" + imageName + "-ultracompressed.jpg");
      //const imageURL = "https://femefun.com/contents/videos_screenshots/50000/50719/preview.mp4.jpg";
      try {
        await sharp(imagePath)
          .resize({
            width: Math.floor(metadata.width/2),
            height: Math.floor(metadata.height/2)
          })
          .withMetadata()
          .toFormat("jpg", { mozjpeg: true })
          .toFile(newImagePath);
        await sharp(imagePath)
          .resize({
            width: Math.floor(metadata.width>5 ? metadata.width/5 : metadata.width),
            height: Math.floor(metadata.height>5 ? metadata.height/5 : metadata.height)
          })
          .withMetadata()
          .toFormat("jpg", { mozjpeg: true })
          .toFile(compressedImagePath);
        console.log("Here 1");
        fs.unlinkSync(imagePath);
        console.log("Here 2");
        var safeToUseResp = await deepai.callStandardApi("nsfw-detector", {
          image: imageURL,
        });
        if (safeToUseResp.output.nsfw_score > 0.1) {
          res.json({ "saved_successfully": false, "image_safe": false });
          return;
        }
        const newFoundDetail = await new foundModel({
          title,
          location,
          submittedat,
          description,
          photo_id,
          imageURL,
          compressedImageURL,
          email,
          username
        }).save().then((result) => {
          console.log(result);
        });
        return res.json({ saved_successfully: true, "image_safe": true });
      } catch (error){return errorFxn(res,error)};
    } catch (error){return errorFxn(res,error)};
  } catch (error){return errorFxn(res,error)};
};

exports.deleteFounds = async (req, res) => {
  await foundModel.remove();
  res.send("Deleted Successfully");
};

const compare = (a, b) => {
  return b.date - a.date;
};

// const LostDetails = require("../models/LostModels");
// const foundDetails = require("../models/foundModels");
// const fs = require("fs");

// exports.getLostDetails = async (req, res) => {
//   try {
//     const details = await LostDetails.find();
//     details.sort(compare);
//     return res.json({ details: details });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// exports.addLostForm = async (req, res) => {
//   try {
//     return res.render("add_user");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// exports.postLostDetails = async (req, res) => {
//   try {
//     var { title, location, phonenumber, description, link } = req.body;

//     //   const image = req.file ? req.file.filename : link;

//     //   if (!image) {
//     //     console.log("error", "Please attach your pdf!!");
//     //     return res.redirect("/Lost/raise");
//     //   }
//     //console.log(path);
//     const newLostDetail = await new LostDetails({
//       title,
//       location,
//       phonenumber,
//       description,
//       link,
//     }).save();
//     if (!newLostDetail) {
//       res.redirect("/Lost/raise");
//     }

//     return res.json({ saved_successfully: true });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ saved_successfully: false });
//   }
// };

// exports.deleteLostDetail = async (req, res) => {
//   const id = req.params.details_id;
//   LostDetails.findOneAndDelete(id, (err, result) => {
//     if (result.link != "") {
//       try {
//         fs.unlinkSync("./uploads/" + result.link);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     if (err) {
//       res.json({ message: err.message });
//     } else {
//       res.redirect(`/Lost`);
//     }
//   });
// };

// // found details

// exports.getfoundDetails = async (req, res) => {
//   try {
//     const details = await foundDetails.find();

//     return res.json({ details: details });
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// exports.addfoundForm = async (req, res) => {
//   try {
//     return res.render("addfound");
//   } catch (error) {
//     console.log(error.message);
//   }
// };

// exports.postfoundDetails = async (req, res) => {
//   // console.log(req.body);
//   try {
//     var { title, location, submittedat, description, link } = req.body;

//     //   const image = req.file ? req.file.filename : link;

//     //   if (!image) {
//     //     console.log("error", "Please attach your pdf!!");
//     //     return res.redirect("/Lost/found");
//     //   }
//     //console.log(path);
//     const newfoundDetail = await new foundDetails({
//       title,
//       location,
//       submittedat,
//       description,
//       link,
//     }).save();
//     if (!newfoundDetail) {
//       res.redirect("/Lost/found");
//     }

//     return res.json({ saved_successfully: true });
//   } catch (error) {
//     console.log(error.message);
//     return res.json({ saved_successfully: false });
//   }
// };

// exports.deletefoundDetail = async (req, res) => {
//   const id = req.params.details_id;
//   foundDetails.findOneAndDelete(id, (err, result) => {
//     if (result.link != "") {
//       try {
//         fs.unlinkSync("./uploads/" + result.link);
//       } catch (err) {
//         console.log(err);
//       }
//     }
//     if (err) {
//       res.json({ message: err.message });
//     } else {
//       res.redirect(`/Lost`);
//     }
//   });
// };

// const compare = (a, b) => {
//   return b.date - a.date;
// };
