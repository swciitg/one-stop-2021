const { TravelPostModel, TravelChatModel, ReplyPostModel } = require("../models/campusTravelModel");
const nodeoutlook = require('nodejs-nodemailer-outlook');
const { sendToDevice, sendToUser } = require("./notificationController");
const userModel = require("../models/userModel");
const asyncHandler = require("../middlewares/async.controllers.handler");
const { NotificationCategories } = require("../helpers/constants");

const sendMailForTravelPostReply = async (replier_name, reciever_email, reciever_name, from, to, travelDateTime) => {
    console.log(reciever_name, replier_name, travelDateTime);
    await nodeoutlook.sendEmail({
        auth: {
            user: process.env.SWC_EMAIL,
            pass: process.env.SWC_EMAIL_PASSWORD
        },
        from: process.env.SWC_EMAIL,
        to: reciever_email,
        subject: 'New Reply on your travel post, Cab sharing : OneStop IITG',
        html: `Hello 👋, <b>${reciever_name}</b>. You have got a new reply on your upcoming travel post.<br>Travelling from ${from} to ${to} <br>Travel Date & Time : ${travelDateTime.toLocaleString("en-US")}<br>Replier name : ${replier_name}<br><br>Regards,<br>Team SWC`
    });
}

exports.postTravel = async (req, res) => {
    try {
        let travelDateTime = new Date(req.body.travelDateTime);
        let chatModel = new TravelChatModel();
        chatModel = await chatModel.save();
        let data = { "email": req.body.email, "name": req.body.name, "travelDateTime": travelDateTime, "to": req.body.to, "from": req.body.from, "margin": req.body.margin, "note": req.body.note, "chatId": chatModel.id };
        if ("phonenumber" in req.body) data["phonenumber"] = req.body.phonenumber;
        let travelModel = new TravelPostModel(data);
        await travelModel.save();
        console.log(travelModel);
        res.json({ "success": true });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}


function getFormattedDate(travelDateTime) {
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    let date = travelDateTime.toLocaleDateString("en-US", options);
    console.log(date);
    let d = date[5] == ',' ? parseInt(date[4]) : parseInt(date.substring(4, 6));
    let suff;
    console.log(d % 10, date.substring(5, 7));
    if (d > 3 && d < 21) suff = 'th';
    else {
        switch (d % 10) {
            case 1:
                suff = "st";
                break;
            case 2:
                suff = "nd";
                break;
            case 3:
                suff = "rd";
                break;
            default:
                suff = "th";
                break;
        }
    }
    date = date[5] == ',' ? date.slice(0, 5) + suff + date.slice(5) : date.slice(0, 6) + suff + date.slice(6);
    return date;
}

exports.getTravelPosts = async (req, res) => {
    try {
        if (req.query.travelDateTime === undefined) { // default when no filter selected
            let date = new Date();
            // date.toDateString();
            date = new Date(date.toISOString().split("T")[0]);
            req.query.travelDateTime = date.toISOString();
        }
        let lowerDate = new Date(req.query.travelDateTime);
        let upperDate = new Date(req.query.travelDateTime);
        console.log("here", req.query.travelDateTime);
        upperDate.setDate(upperDate.getDate() + 1);
        console.log(req.body);
        console.log(lowerDate, upperDate);
        // console.log(req.query.to===undefined);
        let travelPosts = await TravelPostModel.find(
            req.query.to === undefined ? {
                travelDateTime: {
                    $gte: lowerDate
                }
            } : {
                travelDateTime: {
                    $gte: lowerDate,
                    $lt: upperDate
                }, to: req.query.to, from: req.query.from
            }).sort({ "travelDateTime": 1 });
        console.log(travelPosts);
        let datewiseTravelPost = {};
        travelPosts.forEach((element) => {
            let date = getFormattedDate(element["travelDateTime"]);
            console.log(typeof (date), date);
            if (date in datewiseTravelPost) {
                datewiseTravelPost[date].push(element);
            }
            else datewiseTravelPost[date] = [element];
        });
        res.json({ "success": true, "details": datewiseTravelPost });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}

exports.deleteTravelPost = async (req, res) => {
    try {
        console.log("FSJDFJKSDFJK");
        const id = req.query.travelPostId;
        let travelPost = await TravelPostModel.findById(id);
        console.log(travelPost);
        console.log(req.body);
        console.log(travelPost["email"]);
        console.log("here");
        if (travelPost["email"] !== req.body.email) {
            res.json({ "success": false, "message": "Email doesn't match" });
            return;
        }
        await TravelChatModel.findByIdAndDelete(travelPost["chatId"]);
        await TravelPostModel.findByIdAndDelete(id);
        res.json({ "success": true });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}

exports.deleteAllTravelPosts = async (req, res) => {
    try {
        await TravelPostModel.deleteMany();
        res.json({ "success": true });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}

exports.getMyAds = async (req, res) => {
    try {
        const email = req.query.email;
        let myTravelPosts = await TravelPostModel.find({ "email": email });
        res.json({ "success": true, "details": myTravelPosts });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}

exports.getTravelPostChatReplies = async (req, res) => {
    try {
        const id = req.query.chatId;
        console.log(id);
        let travelChat = await TravelChatModel.findById(id);
        res.json({ "success": true, "replies": travelChat["replies"] });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}


async function sendPostReplyNotif(title, replier, senderOutlook, recieverOutlook) {
    if (senderOutlook !== recieverOutlook){
        let user = await userModel.findOne({ outlookEmail: recieverOutlook});
        await sendToUser(user._id,NotificationCategories.cabSharing,title,`${replier} replied to your recent Travel Post on OneStop 🙌. Click to see!!`);
    }
}

exports.postReplyChat = asyncHandler(async (req, res) => {
    console.log(req.body);
    const id = req.query.chatId;
    const data = req.body;
    let travelChatReply = new ReplyPostModel(data);
    let travelChat = await TravelChatModel.findById(id);
    travelChat["replies"].push(travelChatReply);
    travelChat = await travelChat.save();
    // console.log(travelChat);
    TravelPostModel.findOne({ chatId: id }).then((travelPost) => {
        console.log(travelPost["travelDateTime"]);
        sendPostReplyNotif(`Cab sharing reply: ${travelChatReply.message.substr(0,1)}`, data["name"], data["email"], travelPost.email);
        //if(true){ // when other people writes a message
        //sendMailForTravelPostReply(data["name"],travelPost["email"],travelPost["name"],travelPost["from"],travelPost["to"],travelPost["travelDateTime"]);
        // req.body.notif={};
        //   req.body.notif.category = "travel";
        //   req.body.notif.model = "maybeJsonValue";
        //   req.body.notif.header = "Cab sharing reply";
        //   req.body.notif.body = `You have got reply from ${data["name"]} 🙌`;
        //   //ADD here chat reply body
        //   req.body.sendTo = travelPost.email;
        // ADD send to email here
        //sendToDevice(req,res);
        //}
    });
    res.json({ "success": true });
});