const mongoose = require("mongoose");
const firebase = require("firebase-admin");
const serviceAccount = require("../config/push-notification-key.json");
const { NotificationCategories, sendToAllFirebaseTopicName } = require("../helpers/constants");
const { sendToATopic } = require("../controllers/notificationController");
if (!firebase.apps.length)
    firebase.initializeApp({
      credential: firebase.credential.cert(serviceAccount),
    });

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

AnnouncementSchema.pre('save', async function(next){
    console.log(this);
    let notification = {
      "title": this.title,
      "body": this.body
    };
  
    let data= {
      "category": NotificationCategories.announcement,
      "title": this.title,
      "body": this.body
    }
    
    await sendToATopic(NotificationCategories.announcement,notification, data);
});

module.exports = mongoose.model("announcements",AnnouncementSchema);