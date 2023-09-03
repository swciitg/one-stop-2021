const path = require("path");

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
