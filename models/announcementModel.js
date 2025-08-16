import mongoose from "mongoose";
import firebase from "firebase-admin";
import serviceAccount from "../config/push-notification-key.json" assert { type: "json" };
import { NotificationCategories, sendToAllFirebaseTopicName } from "../helpers/constants.js";
import { sendToATopic } from "../controllers/notificationController.js";

if (!firebase.apps.length) {
  firebase.initializeApp({
    credential: firebase.credential.cert(serviceAccount),
  });
}

const AnnouncementSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  body: {
    type: String,
    required: true,
    maxLength: 150
  }
});

AnnouncementSchema.pre('save', async function(next) {
  console.log(this);
  let notification = {
    "title": this.title,
    "body": this.body
  };

  let data = {
    "category": NotificationCategories.announcement,
    "title": this.title,
    "body": this.body
  };

  await sendToATopic(NotificationCategories.announcement, notification, data);
});

export default mongoose.model("announcements", AnnouncementSchema);