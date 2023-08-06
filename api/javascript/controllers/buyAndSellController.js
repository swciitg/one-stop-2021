const buyModel = require("../models/buyModel");
const sellModel = require("../models/sellModel");
const fs = require("fs");
const path = require("path");
const uuid = require("uuid");
const sharp = require("sharp");
const mongoose = require("mongoose");
const { NotificationCategories } = require("../helpers/constants");
const { sendToAll, sendToATopic } = require("./notificationController");

function errorFxn(res, err) {
  console.log(err);
  return res.status(500).json({
    saved_successfully: false,
    image_safe: true
  });
}

// exports.getImage = async (req, res) => {
//   console.log("Get image par");
//   const imagePath = path.resolve(
//     __dirname +
//     "/../" +
//     "images_folder" +
//     "/" +
//     req.query.photo_id +
//     "-compressed.jpg"
//   );
//   console.log(imagePath);
//   res.sendFile(imagePath);
// };

// exports.getCompressedImage = async (req, res) => {
//   console.log("Get image par");
//   const imagePath = path.resolve(
//     __dirname +
//     "/../" +
//     "images_folder" +
//     "/" +
//     req.query.photo_id +
//     "-ultracompressed.jpg"
//   );
//   console.log(imagePath);
//   res.sendFile(imagePath);
// };

exports.getSellDetails = async (req, res) => {
  try {
    console.log(req);
    const details = await sellModel.find();
    details.sort(compare);
    return res.json({
      details: details
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.getSellPageDetails = async (req, res) => {
  let page = req.query.page;
  const toSkip = (page - 1) * 5;
  const docsCount = await sellModel.countDocuments();
  if (toSkip > docsCount) {
    res.json({ result: false, details: [] });
    return;
  }
  const sellItems = await sellModel.find().sort({ "date": -1 }).skip(toSkip).limit(5);
  res.json({ result: true, details: sellItems });
}

exports.deleteSellAll = async (req,res) => {
  await sellModel.deleteMany({});
  res.json({success : true});
}

async function sendSellNotif(title,username,outlookEmail){

  let notification = {
    "title": `Selling: ${title}`,
    "body": `Added by ${username}(${outlookEmail})`
  };

  let data= {
    "title": `Selling: ${title}`,
    "body": `Added by ${username}(${outlookEmail})`
  }

  await sendToATopic(NotificationCategories.sell,notification, data);
}

exports.postSellDetails = async (req, res) => {
  try {
    var {
      title,
      price,
      phonenumber,
      description,
      imageString,
      email,
      username,
    } = req.body;
    console.log(title);
    console.log(price);
    console.log(phonenumber);
    console.log(description);
    console.log(imageString);

    const imageName = uuid.v4();
    const imagePath = path.resolve(
      __dirname + "/../" + "images_folder" + "/" + imageName + ".jpg"
    );
    console.log("image path is: " + imagePath);
    console.log(Buffer.from(imageString, "base64").toString("ascii"));
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
      process.env.API_URL+"/v3/getImage?photo_id=" + imageName;
      const compressedImageURL =
      process.env.API_URL+"/v3/getCompressedImage?photo_id=" +
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
      console.log(newImagePath);
      //const imageURL = "https://femefun.com/contents/videos_screenshots/50000/50719/preview.mp4.jpg";
      try {
        await sharp(imagePath)
          .resize({
            width: Math.floor(metadata.width / 2),
            height: Math.floor(metadata.height / 2),
          })
          .withMetadata()
          .toFormat("jpg", {
            mozjpeg: true
          })
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
          .toFormat("jpg", {
            mozjpeg: true
          })
          .toFile(compressedImagePath);
        console.log("Here 1");
        console.log("Here 2");
        console.log("fjklsdghjkdfhgjkdfhgjkdhgjfkdhgukjdf");

        const newSellDetail = await new sellModel({
            title,
            price,
            phonenumber,
            description,
            imageURL,
            compressedImageURL,
            email,
            username,
          })
          .save()
          .then((result) => {
            console.log(result);
          });
          await sendSellNotif(req,res,req.body.title);
        return res.json({
          saved_successfully: true,
          image_safe: true
        });
      } catch (error) {
        return errorFxn(res, error);
      }
    } catch (error) {
      return errorFxn(res, error);
    }
  } catch (error) {
    console.log(error);
    return errorFxn(res, error);
  }
};

exports.postSellRemoveDetails = async (req, res) => {
  console.log("lkkjklj" + req.body);
  try {
    const {
      id,
      email
    } = req.body;
    console.log(id, email);
    const foundItem = await sellModel.findById(id);
    if (!foundItem) {
      res.json({
        deleted_successfully: false,
        "message": "looks something wrong"
      });
      return;
    }
    console.log(foundItem);
    if (foundItem.email == email) {
      await sellModel.findByIdAndDelete(id);
      res.json({
        deleted_successfully: true
      });
    }
    res.json({
      message: "This item does not belong to the entered email"
    });
  } catch (error) {
    console.log(error.message);
  }
};

// buy details

exports.getBuyPageDetails = async (req, res) => {
  let page = req.query.page;
  const toSkip = (page - 1) * 5;
  const docsCount = await buyModel.countDocuments();
  if (toSkip > docsCount) {
    res.json({ result: false, details: [] });
    return;
  }
  const buyItems = await buyModel.find().sort({ "date": -1 }).skip(toSkip).limit(5);
  res.json({ result: true, details: buyItems });
}

exports.getBuyDetails = async (req, res) => {
  try {
    const details = await buyModel.find();
    details.sort(compare);
    return res.json({
      details: details
    });
  } catch (error) {
    console.log(error.message);
  }
};

exports.deleteBuyAll = async (req,res) => {
  await buyModel.deleteMany({});
  res.json({success : true});
}

async function sendBuyNotif(title,username,outlookEmail){

  let notification = {
    "title": `Interested in buying: ${title}`,
    "body": `Added by ${username}(${outlookEmail})`
  };

  let data= {
    "title": `Interested in buying: ${title}`,
    "body": `Added by ${username}(${outlookEmail})`
  }

  await sendToATopic(NotificationCategories.buy,notification, data);
}

exports.postBuyDetails = async (req, res) => {
  console.log(req.body);
  try {
    var {
      title,
      phonenumber,
      price,
      description,
      imageString,
      email,
      username
    } =
    req.body;
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
      process.env.API_URL+"/v3/getImage?photo_id=" + imageName;
      const compressedImageURL =
      process.env.API_URL+"/v3/getCompressedImage?photo_id=" +
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
          .toFormat("jpg", {
            mozjpeg: true
          })
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
          .toFormat("jpg", {
            mozjpeg: true
          })
          .toFile(compressedImagePath);
        console.log("Here 1");
        console.log("Here 2");
        console.log(imagePath);
        console.log("fjklsdghjkdfhgjkdfhgjkdhgjfkdhgukjdf");

        const newBuyDetail = await new buyModel({
            title,
            price,
            phonenumber,
            description,
            imageURL,
            compressedImageURL,
            email,
            username,
          })
          .save()
          .then((result) => {
            console.log(result);
          });
          await sendBuyNotif(title,username,email);
        return res.json({
          saved_successfully: true,
          image_safe: true
        });
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

exports.postBuyRemoveDetails = async (req, res) => {
  try {
    const {
      id,
      email
    } = req.body;
    console.log(id, email);
    const foundItem = await buyModel.findById(id);
    if (!foundItem) {
      res.json({
        deleted_successfully: false,
        "message": "looks something wrong"
      });
      return;
    }
    console.log(foundItem.email);
    if (foundItem.email == email) {
      await buyModel.findByIdAndDelete(id);
      res.json({
        deleted_successfully: true
      });
    } else {
      res.json({
        message: "This item does not belong to the entered email"
      });
    }
  } catch (error) {
    console.log(error.message);
  }
};

exports.getMyAds = async (req, res) => {
  console.log(req.body);
  try {
    const {
      email
    } = req.body;
    console.log(email);

    const buyDetails = await buyModel.find({
      email: email
    });
    buyDetails.sort(compare);

    const sellDetails = await sellModel.find({
      email: email
    });
    sellDetails.sort(compare);

    const allDetails = {
      sellList: sellDetails,
      buyList: buyDetails,
    };
    return res.json({
      details: allDetails
    });
  } catch (error) {
    console.log(error.message);
  }
};

const compare = (a, b) => {
  return b.date - a.date;
};