const multer = require("multer");
const fs = require("fs");
const uuid= require("uuid");

const directoryPath = __dirname + "/../files_folder/hab_complaints_files/";

const fileStorageEngine = multer.diskStorage({
    destination: (req,file,cb) => {
        if (!fs.existsSync(directoryPath)) {
            fs.mkdirSync(directoryPath, { recursive: true });
        }
        cb(null, directoryPath);
    },
    filename: (req,file,cb) => {
      console.log(file);
      let fileSaveName;
      let parts = file.originalname.split(".");
      let fileExtension = "." + parts[parts.length-1];
      parts.pop();
      if (fs.existsSync(directoryPath + file.originalname)) {
        fileSaveName = parts.join('.')+uuid.v4()+fileExtension;
      }else{
        fileSaveName = file.originalname;
      }
      req.body.filename = fileSaveName;
      cb(null, fileSaveName);
    }
});

const upload = multer({storage: fileStorageEngine});

module.exports = upload
