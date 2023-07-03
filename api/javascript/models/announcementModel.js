const mongoose = require("mongoose");
const firebase = require("firebase-admin");
const serviceAccount = require("../config/push-notification-key.json");
const { NotificationCategories, sendToAllFirebaseTopicName } = require("../helpers/constants");
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
    const payload = {
        data: {
          category: NotificationCategories.announcement,
          model: "",
          header: this.title,
          body: this.body
        }
      };
      console.log(payload);
      const options = {priority: "high"};
      await firebase.messaging().sendToTopic(sendToAllFirebaseTopicName,payload,options);
});

module.exports = mongoose.model("announcements",AnnouncementSchema);