const cron = require("node-cron");
const { Response } = require("../../models/habModels/opiResponseModel");
const nodemailer = require("nodemailer");
const XLSX = require("xlsx");
const fs = require("fs");
const path = require("path");
const { fileURLToPath } = require('url');
require('dotenv').config();

const __filename = fileURLToPath(__filename);
const __dirname = path.dirname(__filename);

const { opiMailRecipients, opiStartDate, opiEndDate } = require("../constants");

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: false,
  auth: {
    user: process.env.EMAIL_ID,
    pass: process.env.EMAIL_PASS,
  }
});

const convertToExcel = (data, fileName) => {
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(data);
  XLSX.utils.book_append_sheet(wb, ws, "Sheet1");

  const filesDir = path.join(__dirname, "../../public/files");
  if (!fs.existsSync(filesDir)) {
    fs.mkdirSync(filesDir);
  }
  const filePath = path.join(filesDir, fileName);
  XLSX.writeFile(wb, filePath);
  return filePath;
};

const groupDataBySubscribedMess = (data) => {
  return data.reduce((acc, curr) => {
    const mess = curr.subscribedMess || "Unknown";
    if (!acc[mess]) {
      acc[mess] = [];
    }
    acc[mess].push(curr);
    return acc;
  }, {});
};

const sendEmailForDate = async (date, recipients) => {
  try {
    const startOfDay = new Date(date);
    startOfDay.setUTCHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setUTCHours(23, 59, 59, 999);
    const data = await Response.find({
      createdAt: {
        $gte: startOfDay,
        $lte: endOfDay,
      },
    });

    if (data && data.length > 0) {
      const groupedData = groupDataBySubscribedMess(data);

      for (const [mess, records] of Object.entries(groupedData)) {
        const fileName = `OPIdata_${mess}_${date}.xlsx`;
        const filePath = convertToExcel(records, fileName);

        const mailOptions = {
          from: process.env.EMAIL_ID,
          to: recipients,
          subject: `Data for ${mess} on ${date}`,
          text: `Please find attached the OPI data for ${mess} on ${date}. Regards, Team SWC`,
          attachments: [
            {
              filename: fileName,
              path: filePath,
            },
          ],
        };

        await transporter.sendMail(mailOptions);
        console.log(`Data for ${mess} on ${date} sent to emails`);
        fs.unlinkSync(filePath);
      }
    } else {
      console.log(`No data found for ${date}`);
    }
  } catch (e) {
    console.log(e);
  }
};

const sendSummaryEmail = async (startDate, endDate, recipients) => {
  const start = new Date(startDate);
  start.setUTCHours(0, 0, 0, 0);
  const end = new Date(endDate);
  end.setUTCHours(23, 59, 59, 999);

  const data = await Response.find({
    createdAt: {
      $gte: start,
      $lte: end,
    },
  });

  if (data.length > 0) {
    const groupedData = groupDataBySubscribedMess(data);
    
    for (const [mess, records] of Object.entries(groupedData)) {
      const fileName = `OPIdata_${mess}_${startDate}_to_${endDate}.xlsx`;
      const filePath = convertToExcel(records, fileName);

      const mailOptions = {
        from: process.env.EMAIL_ID,
        to: recipients,
        subject: `Summary Data for ${mess} from ${startDate} to ${endDate}`,
        text: `Please find attached the OPI data for ${mess} from ${startDate} to ${endDate}. Regards, Team SWC`,
        attachments: [
          {
            filename: fileName,
            path: filePath,
          },
        ],
      };

      await transporter.sendMail(mailOptions);
      console.log(`Summary data for ${mess} from ${startDate} to ${endDate} sent to emails`);
      fs.unlinkSync(filePath);
    }

    await Response.deleteMany({
      createdAt: {
        $gte: start,
        $lte: end,
      },
    });
    console.log(`Data from ${startDate} to ${endDate} deleted from database`);
  } else {
    console.log(`No summary data found from ${startDate} to ${endDate}`);
  }
};

const processDateList = async (startDate, endDate, recipients) => {
  const currentDate = new Date(startDate);

  while (currentDate <= new Date(endDate)) {
    const date = currentDate.toISOString().split("T")[0];
    await sendEmailForDate(date, recipients);
    currentDate.setDate(currentDate.getDate() + 1);
  }

  await sendSummaryEmail(startDate, endDate, recipients);
};

const scheduleOPIEmails = (startDate = opiStartDate, endDate = opiEndDate) => {
  if (opiMailRecipients.length === 0) {
    console.log("No recipients found for OPI data emails");
    return;
  }
  const recipients = opiMailRecipients.join(", ");
  cron.schedule("40 23 * * *", async () => {
    console.log("Running scheduled date processing at 11:40 PM...");
    await processDateList(startDate, endDate, recipients);
  });
};

module.exports = {
  processDateList,
  scheduleOPIEmails
};