import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(__dirname, "../files_folder/hostel_upload/");
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); 
      }
      cb(null, uploadPath); 
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname); 
    }
  });
  
const upload = multer({
    storage: storage,
    fileFilter: (req, file, cb) => {
      if (path.extname(file.originalname) !== '.xlsx') {
        return cb(new Error('Only .xlsx files are allowed!'));
      }
      cb(null, true);
    }
});

export default upload;