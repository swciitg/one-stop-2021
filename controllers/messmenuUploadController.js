import fs from 'fs';
import xlsx from 'node-xlsx';
import path from 'path';
import { fileURLToPath } from 'url';
import MessMenu from '../models/messMenuModel.js';
import User from '../models/userModel.js';
import PrivateKey from '../models/privatekeyModel.js';
import crypto from 'crypto';

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const createMeal = (description, startTime, endTime) => {
  const currentDate = new Date();
  const [startHour, startMinute] = startTime.split(':').map(Number);
  const [endHour, endMinute] = endTime.split(':').map(Number);

  const startTiming = new Date(currentDate);
  startTiming.setHours(startHour, startMinute, 0, 0);
  startTiming.setMinutes(startTiming.getMinutes() - 330);

  const endTiming = new Date(currentDate);
  endTiming.setHours(endHour, endMinute, 0, 0);
  endTiming.setMinutes(endTiming.getMinutes() - 330); 

  return {
    mealDescription: description,
    startTiming: startTiming,
    endTiming: endTiming
  };
};

const timings = {
  breakfast: { start: '07:15', end: '09:30' },
  lunch: { start: '12:00', end: '14:00' },
  dinner: { start: '19:30', end: '21:30' }
};

const weekendtimings = {
  breakfast: { start: '07:30', end: '09:30' },
  lunch: { start: '12:00', end: '14:00' },
  dinner: { start: '19:30', end: '21:30' }
}

async function UpdateUser(filePath) {
  try {
    const workSheetsFromFile = xlsx.parse(fs.readFileSync(filePath));
    const sheet = workSheetsFromFile[0].data;
    for (let i = 1; i < sheet.length; i++) {
      const row = sheet[i];
      const rollNumber = row[1];
      
      const user = await User.findOne({ rollNo:rollNumber });
      
      if (user) {
        user.hostel = row[2].toLocaleUpperCase();
        await user.save();
      } else {
        console.log(`User with Roll Number: ${rollNumber} not found`);
      }
    }

    console.log('All rows processed.');
    return { message: 'All rows processed successfully' };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

async function UpdateUserMess(filePath) {
  try {
    const workSheetsFromFile = xlsx.parse(fs.readFileSync(filePath));
    const sheet = workSheetsFromFile[0].data;
    for (let i = 1; i < sheet.length; i++) {
      const row = sheet[i];
      const rollNumber = row[1];
      
      const user = await User.findOne({ rollNo:rollNumber });
      
      if (user) {
        user.subscribedMess = row[2].toLocaleUpperCase();
        await user.save();
      } else {
        console.log(`User with Roll Number: ${rollNumber} not found`);
      }
    }

    console.log('All rows processed.');
    return { message: 'All rows processed successfully' };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

async function saveMessMenuForHostel(filePath, hostelName) {
  try {
    const workSheetsFromFile = xlsx.parse(fs.readFileSync(filePath));
    const sheet = workSheetsFromFile[0].data;

    const days = [];
    const breakf = [];
    const lun = [];
    const din = [];

    let currentDay = "";
    let br = "", lu = "", di = "";

    for (let i = 1; i < sheet.length; i++) {
      const row = sheet[i];
      const day = row[0];
      const breakfast = row[1] || "";
      const lunch = row[2] || "";
      const dinner = row[3] || "";

      if (day && day.trim() !== "") {
        // Save previous day's meals if any
        if (currentDay !== "") {
          days.push(currentDay.toLowerCase());
          breakf.push(br.trim());
          lun.push(lu.trim());
          din.push(di.trim());
        }
        // New day starts
        currentDay = day;
        br = breakfast + " ";
        lu = lunch + " ";
        di = dinner + " ";
      } else {
        br += breakfast + " ";
        lu += lunch + " ";
        di += dinner + " ";
      }
    }

    // Push last day
    if (currentDay !== "") {
      days.push(currentDay.toLowerCase());
      breakf.push(br.trim());
      lun.push(lu.trim());
      din.push(di.trim());
    }

    // Build the mess menu dynamically
    const messMenu = { hostel: hostelName };

    days.forEach((day, i) => {
      const timingSet = ["saturday", "sunday"].includes(day) ? weekendtimings : timings;

      messMenu[day] = {
        breakfast: createMeal(breakf[i], timingSet.breakfast.start, timingSet.breakfast.end),
        lunch: createMeal(lun[i], timingSet.lunch.start, timingSet.lunch.end),
        dinner: createMeal(din[i], timingSet.dinner.start, timingSet.dinner.end)
      };
    });

    await MessMenu.findOneAndUpdate(
      { hostel: hostelName },
      messMenu,
      { upsert: true, new: true }
    );

    console.log(`Menu for ${hostelName} processed successfully`, messMenu);
  } catch (error) {
    throw new Error(`Error processing menu for ${hostelName}: ${error.message}`);
  }
}

function wrapWithRSAKeys(data) {
  const publicKeyHeader = '-----BEGIN RSA PRIVATE KEY-----\n';
  const privateKeyFooter = '\n-----END RSA PRIVATE KEY-----';
  
  return publicKeyHeader + data + privateKeyFooter;
}

export const uploadmessmenu = async (req, res) => {
  try {
    console.log('File upload request received');

    if (!req.files) {
      console.log('No file uploaded');
      return res.status(400).send('No file uploaded');
    }

    if(req.body.security != process.env.MESSMENU_SECURITY){
      return res.status(400).send('Wrong secret key')
    }

    req.files.forEach(async(file) => {
        console.log(file.filename)
        const filePath = path.join(__dirname, '/../files_folder/mess_menu_files', file.filename);
        const hostelName = file.filename.split('.').slice(0, -1).join('.');
        console.log('Processing users with hostelName:', hostelName);
        try {
            await saveMessMenuForHostel(filePath, hostelName.toLocaleUpperCase());
            console.log('Mess menu saved successfully.');
        } catch (error) {
            console.error('Error during saveMessMenuForHostel:', error.message);
            return res.status(500).send(`Error processing menu for ${hostelName}: ${error.message}`);
        }
    });

    // Success response
    res.render('response.ejs');

  } catch (error) {
    console.error('Error during upload and processing:', error.message);
    res.status(500).send('An error occurred while processing the hostel menu');
  }
};

export const uploaduserHostel = async (req,res) => {
  try {

    if(!req.file){
      console.log('No file uploaded');
      return res.status(400).send('No file uploaded');
    }

    const publicKey = `${req.body.publicKey}`;
    console.log(publicKey);
    const privateKeyModel = await PrivateKey.findOne({});
    const privateString = `${privateKeyModel.privateKey}`;
    const privateKey = wrapWithRSAKeys(privateString);
    console.log(privateKey);

    const message = "This is a test message";
    // Encrypt the message using the public key
    const encryptedMessage = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(message)
    );
    console.log("Encrypted Message:", encryptedMessage.toString('base64'));

    // Decrypt the message using the private key
    const decryptedMessage = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      encryptedMessage
    );
    const checkmessage = decryptedMessage.toString();
    if(checkmessage !== message){
      return res.status(400).send('Decryption failed');
    }

    const filePath = path.join(__dirname, '/../files_folder/hostel_upload', req.file.filename);
    const fname = req.file.filename.split('.').slice(0, -1).join('.');
    console.log('Processing users of file:', fname);
    try {
        await UpdateUser(filePath);
        console.log('Data saved successfully.');
    } catch (error) {
        console.error('Error during saving data:', error.message);
        return res.status(500).send(`Error processing file: ${error.message}`);
    }
    res.render('response.ejs');
  } catch (error) {
    console.error('Error during file upload:', error.message);
    res.status(500).send('An error occurred during file upload');
  }
}

export const uploaduserMess = async (req,res) => {
  try {

    if(!req.file){
      console.log('No file uploaded');
      return res.status(400).send('No file uploaded');
    }

    const publicKey = `${req.body.publicKey}`;
    console.log(publicKey);
    const privateKeyModel = await PrivateKey.findOne({});
    const privateString = `${privateKeyModel.privateKey}`;
    const privateKey = wrapWithRSAKeys(privateString);
    console.log(privateKey);

    const message = "This is a test message";
    // Encrypt the message using the public key
    const encryptedMessage = crypto.publicEncrypt(
      {
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      Buffer.from(message)
    );
    console.log("Encrypted Message:", encryptedMessage.toString('base64'));

    // Decrypt the message using the private key
    const decryptedMessage = crypto.privateDecrypt(
      {
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_OAEP_PADDING,
      },
      encryptedMessage
    );
    const checkmessage = decryptedMessage.toString();
    if(checkmessage !== message){
      return res.status(400).send('Decryption failed');
    }

    const filePath = path.join(__dirname, '/../files_folder/hostel_upload', req.file.filename);
    const fname = req.file.filename.split('.').slice(0, -1).join('.');
    console.log('Processing users of file:', fname);
    try {
        await UpdateUserMess(filePath);
        console.log('Data saved successfully.');
    } catch (error) {
        console.error('Error during saving data:', error.message);
        return res.status(500).send(`Error processing file: ${error.message}`);
    }
    res.render('response.ejs');
  } catch (error) {
    console.error('Error during file upload:', error.message);
    res.status(500).send('An error occurred during file upload');
  }
}
