import { fileURLToPath } from 'url';
import path from 'path';

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const uploadFilePath = __dirname + "/files_folder/file.csv";