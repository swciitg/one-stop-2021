// const multer = require("multer");
// const fs = require("fs");
// const uuid= require("uuid");
// console.log("check")

// const fileStorageEngine = multer.diskStorage({
//     destination: (req,file,cb) => {
//         cb(null,__dirname + "/../files_folder/pharmacyForms_files/");
//     },
//     filename: (req,file,cb) => {
//       console.log(file);
//       let fileSaveName;
//       let parts = file.originalname.split(".");
//       let fileExtension = "." + parts[parts.length-1];
//       parts.pop();
//       if (fs.existsSync(__dirname + "/../files_folder/pharmacyForms_files/" + file.originalname)) {
//         fileSaveName = parts.join('.')+uuid.v4()+fileExtension;
//       }else{
//         fileSaveName = file.originalname;
//       }
//       req.body.filename = fileSaveName;
//       cb(null, fileSaveName);
//     }
// });
// console.log("check")

// const  upload = multer({storage: fileStorageEngine});

// module.exports = upload

import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the destination directory
const uploadDir = path.join(__dirname, "../files_folder/pharmacyFeedbackForms_files");

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {;
        let fileSaveName;
        let parts = file.originalname.split(".");
        let fileExtension = "." + parts[parts.length - 1];
        parts.pop();

        // Check if the file already exists
        if (fs.existsSync(path.join(uploadDir, file.originalname))) {
            fileSaveName = parts.join('.') + uuidv4() + fileExtension;
        } else {
            fileSaveName = file.originalname;
        }

        req.body.filename = fileSaveName;
        cb(null, fileSaveName);
    }
});

const upload = multer({ storage: fileStorageEngine });

export default upload;
