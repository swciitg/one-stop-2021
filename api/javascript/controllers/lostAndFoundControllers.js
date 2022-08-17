const LostModel = require("../models/LostModel");
const foundModel = require("../models/foundModel");
const fs = require("fs");
const path = require("path");
const deepai = require("deepai");
const uuid = require("uuid");
const sharp = require("sharp");
const mongoose = require("mongoose");
deepai.setApiKey(process.env.NSFW_API_KEY);

function errorFxn(res, err) {
  console.log(err);
  return res.json({ saved_successfully: false, image_safe: true, error: err });
}

exports.getImage = async (req, res) => {
  console.log("Get image par");
  const imagePath = path.resolve(
    __dirname +
      "/../" +
      "images_folder" +
      "/" +
      req.query.photo_id +
      "-compressed.jpg"
  );
  console.log(imagePath);
  res.sendFile(imagePath);
};

exports.getCompressedImage = async (req, res) => {
  console.log("Get image par");
  const imagePath = path.resolve(
    __dirname +
      "/../" +
      "images_folder" +
      "/" +
      req.query.photo_id +
      "-ultracompressed.jpg"
  );
  console.log(imagePath);
  res.sendFile(imagePath);
};

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
    var {
      title,
      location,
      phonenumber,
      description,
      imageString,
      email,
      username,
    } = req.body;
    console.log(title);
    console.log(location);
    console.log(phonenumber);
    console.log(description);
    console.log(imageString);
    // console.log(imageString);
    //console.log(uuid.v4());

    //   const image = req.file ? req.file.filename : link;

    //   if (!image) {
    //     console.log("error", "Please attach your pdf!!");
    //     return res.redirect("/Lost/raise");
    //   }
    const imageName = uuid.v4();
    const imagePath = path.resolve(
      __dirname + "/../" + "images_folder" + "/" + imageName + ".jpg"
    );
    console.log(imagePath);
    fs.writeFileSync(imagePath, Buffer.from(imageString, "base64"), (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });
    try {
      const metadata = await sharp(imagePath).metadata();
      console.log(metadata);
      const photo_id = imageName;
      const imageURL =
        "https://swc.iitg.ac.in/onestopapi/getImage?photo_id=" + imageName;
      const compressedImageURL =
        "https://swc.iitg.ac.in/onestopapi/getCompressedImage?photo_id=" +
        imageName;
      const newImagePath = path.resolve(
        __dirname +
          "/../" +
          "images_folder" +
          "/" +
          imageName +
          "-compressed.jpg"
      );
      const compressedImagePath = path.resolve(
        __dirname +
          "/../" +
          "images_folder" +
          "/" +
          imageName +
          "-ultracompressed.jpg"
      );
      //const imageURL = "https://femefun.com/contents/videos_screenshots/50000/50719/preview.mp4.jpg";
      try {
        await sharp(imagePath)
          .resize({
            width: Math.floor(metadata.width / 2),
            height: Math.floor(metadata.height / 2),
          })
          .withMetadata()
          .toFormat("jpg", { mozjpeg: true })
          .toFile(newImagePath);
        await sharp(imagePath)
          .resize({
            width: Math.floor(
              metadata.width > 5 ? metadata.width / 5 : metadata.width
            ),
            height: Math.floor(
              metadata.height > 5 ? metadata.height / 5 : metadata.height
            ),
          })
          .withMetadata()
          .toFormat("jpg", { mozjpeg: true })
          .toFile(compressedImagePath);
        console.log("Here 1");
        console.log(imageURL);
        console.log("Here 2");
        console.log(process.env.NSFW_API_KEY);
        console.log(imagePath);
        var safeToUseResp = await deepai.callStandardApi("nsfw-detector", {
          image: fs.createReadStream(imagePath),
        });
        fs.unlinkSync(imagePath);
        if (safeToUseResp.output.nsfw_score > 0.1) {
          res.json({ saved_successfully: false, image_safe: false });
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
          username,
        })
          .save()
          .then((result) => {
            console.log(result);
          });
        return res.json({ saved_successfully: true, image_safe: true });
      } catch (error) {
        return errorFxn(res, error);
      }
    } catch (error) {
      return errorFxn(res, error);
    }
  } catch (error) {
    return errorFxn(res, error);
  }
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

exports.claimFoundItem = async (req, res) => {
  console.log("fjkdfgh");
  try {
    
    const { id, claimerEmail, claimerName } = req.body;
    // console.log(req.body);
    let foundItem = await foundModel.findById(id);
    console.log("fsdf");
    console.log(foundItem);
    if (foundItem!=null && foundItem["claimed"]===true) {
      res.json({ saved: false, message: "This item already got claimed" });
      return;
    }
    await foundModel
      .findByIdAndUpdate(id,{
        claimed: true,
        claimerEmail: claimerEmail,
        claimerName: claimerName
      })
      .then((ele) => {
        console.log(ele);
        res.json({ saved: true, message: "Saved successfully" });
      });
  } catch (err) {
    console.log(err);
    res.json({ saved: false, message: err.toString() });
  }
};

exports.postfoundDetails = async (req, res) => {
  console.log(req.body);
  try {
    var {
      title,
      location,
      submittedat,
      description,
      imageString,
      email,
      username,
    } = req.body;
    const imageName = uuid.v4();
    const imagePath = path.resolve(
      __dirname + "/../" + "images_folder" + "/" + imageName + ".jpg"
    );
    console.log(imagePath);

    fs.writeFileSync(imagePath, Buffer.from(imageString, "base64"), (err) => {
      if (err) console.log(err);
      else {
        console.log("File written successfully\n");
      }
    });

    try {
      const metadata = await sharp(imagePath).metadata();
      console.log(metadata);
      const photo_id = imageName;
      const imageURL =
        "https://swc.iitg.ac.in/onestopapi/getImage?photo_id=" + imageName;
      const compressedImageURL =
        "https://swc.iitg.ac.in/onestopapi/getCompressedImage?photo_id=" +
        imageName;
      const newImagePath = path.resolve(
        __dirname +
          "/../" +
          "images_folder" +
          "/" +
          imageName +
          "-compressed.jpg"
      );
      const compressedImagePath = path.resolve(
        __dirname +
          "/../" +
          "images_folder" +
          "/" +
          imageName +
          "-ultracompressed.jpg"
      );
      //const imageURL = "https://femefun.com/contents/videos_screenshots/50000/50719/preview.mp4.jpg";
      try {
        await sharp(imagePath)
          .resize({
            width: Math.floor(metadata.width / 2),
            height: Math.floor(metadata.height / 2),
          })
          .withMetadata()
          .toFormat("jpg", { mozjpeg: true })
          .toFile(newImagePath);
        await sharp(imagePath)
          .resize({
            width: Math.floor(
              metadata.width > 5 ? metadata.width / 5 : metadata.width
            ),
            height: Math.floor(
              metadata.height > 5 ? metadata.height / 5 : metadata.height
            ),
          })
          .withMetadata()
          .toFormat("jpg", { mozjpeg: true })
          .toFile(compressedImagePath);
        console.log("Here 1");
        console.log("Here 2");
        var safeToUseResp = await deepai.callStandardApi("nsfw-detector", {
          image: fs.createReadStream(imagePath),
        });
        fs.unlinkSync(imagePath);
        if (safeToUseResp.output.nsfw_score > 0.1) {
          res.json({ saved_successfully: false, image_safe: false });
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
          username,
        })
          .save()
          .then((result) => {
            console.log(result);
          });
        return res.json({ saved_successfully: true, image_safe: true });
      } catch (error) {
        return errorFxn(res, error);
      }
    } catch (error) {
      return errorFxn(res, error);
    }
  } catch (error) {
    return errorFxn(res, error);
  }
};

exports.deleteFounds = async (req, res) => {
  await foundModel.remove();
  res.send("Deleted Successfully");
};

const compare = (a, b) => {
  return b.date - a.date;
};
