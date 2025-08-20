import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from 'url';

// ES Module compatible way to get __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const uploadDir = path.join(__dirname, "../files_folder/upsp_files/");

if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    let fileSaveName;
    let parts = file.originalname.split(".");
    let fileExtension = "." + parts[parts.length - 1];
    parts.pop();
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