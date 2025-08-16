import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import { fileURLToPath } from "url";

// Get __dirname in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Define the destination directory
const uploadDir = path.join(__dirname, "../files_folder/doctorFeedbackForms_files");

// Create the directory if it doesn't exist
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        console.log("file ye hai ");
        console.log(file);
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