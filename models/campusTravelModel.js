import mongoose from "mongoose";

const TravelPostSchema = new mongoose.Schema({
    "email" : {type: String, required: true},
    "name" : {type: String, required: true},
    "travelDateTime" : {type: Date, required: true},
    "to" : {type: String, required: true},
    "from" : {type: String, required: true},
    "margin" : {type: Number, required: true},
    "note" : {type: String, required: true},
    "phonenumber" : {type: String},
    "chatId" : {type: String, required: true}
});

const ReplyPostSchema = new mongoose.Schema({
    "name" : {type: String, required: true},
    "message" : {type: String, required: true},
    "email" : {type: String, required: true}
});

const ChatSchema = new mongoose.Schema({
    "replies" : [ReplyPostSchema]
});

const TravelPostModel = mongoose.model("TravelPost", TravelPostSchema);
const TravelChatModel = mongoose.model("TravelChat", ChatSchema);
const ReplyPostModel = mongoose.model("TravelChatReply", ReplyPostSchema);

export { TravelPostModel, TravelChatModel, ReplyPostModel };