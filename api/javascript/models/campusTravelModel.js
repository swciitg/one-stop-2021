const mongoose = require("mongoose");

const TravelPostSchema = new mongoose.Schema({
    "email" : {type: String, required: true},
    "travelDateTime" : {type: Date, required: true},
    "to" : {type: String, required: true},
    "from" : {type: String, required: true},
    "margin" : {type: Number, required: true},
    "note" : {type: String, required: true},
    "phonenumber" : {type: String},
    "chatId" : {type: String, required: true}
});

const ReplyPostSchema = new mongoose.Schema({
    "email" : {type: String, required: true},
    "message" : {type: String, required: true},
});

const ChatSchema = new mongoose.Schema({
    "replies" : [ReplyPostSchema]
});

module.exports = {"TravelPostModel" : mongoose.model("TravelPost",TravelPostSchema),"TravelChatModel": mongoose.model("TravelChat",ChatSchema)};