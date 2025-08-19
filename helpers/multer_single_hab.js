import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from 'url';

// ES Module compatible way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const directoryPath = path.resolve(__dirname, "../files_folder/hab_complaint_files/");

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    if (!fs.existsSync(directoryPath)) {
      fs.mkdirSync(directoryPath, { recursive: true });
    }
    cb(null, directoryPath);
  },
  filename: (req, file, cb) => {
    let fileSaveName;
    let parts = file.originalname.split(".");
    let fileExtension = "." + parts[parts.length - 1];
    parts.pop();
    if (fs.existsSync(path.join(directoryPath, file.originalname))) {
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
