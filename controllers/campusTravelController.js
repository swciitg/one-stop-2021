import { TravelPostModel, TravelChatModel, ReplyPostModel, TravelBookingModel } from "../models/campusTravelModel.js";
import { sendEmail } from 'nodejs-nodemailer-outlook';
import { sendToUser } from "./notificationController.js";
import onestopUserModel from "../models/userModel.js";
import asyncHandler from "../middlewares/async.controllers.handler.js";
import { NotificationCategories } from "../helpers/constants.js";

const sendMailForTravelPostReply = async (replier_name, reciever_email, reciever_name, from, to, travelDateTime) => {
    await sendEmail({
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

export async function postTravel(req, res) {
    try {
        let travelDateTime = new Date(req.body.travelDateTime);
        let chatModel = new TravelChatModel();
        chatModel = await chatModel.save();
        let data = { "email": req.body.email, "name": req.body.name, "travelDateTime": travelDateTime, "to": req.body.to, "from": req.body.from, "margin": req.body.margin, "note": req.body.note, "chatId": chatModel.id, "totalSeats": req.body.totalSeats, "availableSeats": req.body.totalSeats };
        if ("phonenumber" in req.body) data["phonenumber"] = req.body.phonenumber;
        let travelModel = new TravelPostModel(data);
        await travelModel.save();
        res.json({ "success": true });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}

export async function requesttoJoin(req, res) {
    try {
        const travelPostId = req.query.travelPostId;
        const { email, name, phonenumber } = req.body;

        if (!travelPostId || !email || !name) {
            return res.status(400).json({ success: false, message: "Missing required fields." });
        }

        const travelPost = await TravelPostModel.findById(travelPostId);
        if (!travelPost) {
            return res.status(404).json({ success: false, message: "Travel post not found." });
        }

        const existingBooking = await TravelBookingModel.findOne({ travelPost: travelPostId, email: email });
        if (existingBooking) {
            return res.status(400).json({ success: false, message: "You have already requested to join this post." });
        }

        const newBooking = new TravelBookingModel({
            travelPost: travelPostId,
            email,
            name,
            phoneNumber: phonenumber,
            status: "pending"
        });

        await newBooking.save();

        travelPost.bookings.push(newBooking._id);
        await travelPost.save();

        const user = await onestopUserModel.findOne({ outlookEmail: travelPost.email });
        if (user) {
            await sendToUser(user._id, NotificationCategories.cabSharing, "New Request to Join", `${name} requested to join your travel post.`);
        }

        res.json({ success: true, message: "Request to join sent." });

    } catch (err) {
        res.status(500).json({ success: false, message: err.toString() });
    }
}


function getFormattedDate(travelDateTime) {
    var options = { year: 'numeric', month: 'short', day: 'numeric' };
    let date = travelDateTime.toLocaleDateString("en-US", options);
    let d = date[5] == ',' ? parseInt(date[4]) : parseInt(date.substring(4, 6));
    let suff;
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

export async function getTravelPosts(req, res) {
    try {
        let travelDateTime = req.query.travelDateTime;
        if (req.query.travelDateTime === undefined) { // default when no filter selected
            let date = new Date();
            date = new Date(date.toISOString().split("T")[0]);
            travelDateTime = date.toISOString();
        }
        let lowerDate = new Date(travelDateTime);
        let upperDate = new Date(travelDateTime);
        upperDate.setDate(upperDate.getDate() + 1);
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
            }).populate("bookings").sort({ "travelDateTime": 1 });
        let datewiseTravelPost = {};
        travelPosts.forEach((element) => {
            let date = getFormattedDate(element["travelDateTime"]);
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

export async function deleteTravelPost(req, res) {
    try {
        const id = req.query.travelPostId;
        let travelPost = await TravelPostModel.findById(id);
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

export async function deleteAllTravelPosts(req, res) {
    try {
        await TravelPostModel.deleteMany();
        res.json({ "success": true });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}

export async function getMyAds(req, res) {
    try {
        const email = req.query.email;
        let myTravelPosts = await TravelPostModel.find({ "email": email }).populate("bookings");
        res.json({ "success": true, "details": myTravelPosts });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}

export async function getTravelPostChatReplies(req, res) {
    try {
        const id = req.query.chatId;
        let travelChat = await TravelChatModel.findById(id);
        res.json({ "success": true, "replies": travelChat["replies"] });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}


async function sendPostReplyNotif(title, replier, senderOutlook, recieverOutlook) {
    if (senderOutlook !== recieverOutlook) {
        let user = await onestopUserModel.findOne({ outlookEmail: recieverOutlook });
        await sendToUser(user._id, NotificationCategories.cabSharing, title, `${replier} replied to your recent Travel Post on OneStop 🙌. Click to see!!`);
    }
}

export const postReplyChat = asyncHandler(async (req, res) => {
    const id = req.query.chatId;
    const data = req.body;
    let travelChatReply = new ReplyPostModel(data);
    let travelChat = await TravelChatModel.findById(id);
    travelChat["replies"].push(travelChatReply);
    travelChat = await travelChat.save();
    TravelPostModel.findOne({ chatId: id }).then((travelPost) => {
        sendPostReplyNotif(`Cab sharing reply: ${travelChatReply.message.substr(0, 1)}`, data["name"], data["email"], travelPost.email);
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


export const acceptBookingController = async (req, res) => {
   const { postId, bookingId } = req.params;
   const session = await mongoose.startSession();
    session.startTransaction();
      try {

        const post = await TravelPostModel.findById(postId).session(session);

        if (!post) {
            throw new Error("Travel post not found");
        }

        if (post.availableSeats <= 0) {
            throw new Error("No seats available");
        }

        const booking = await TravelBookingModel.findById(bookingId).session(session);

        if (!booking) {
            throw new Error("Booking not found");
        }

        if (booking.status !== "pending") {
            throw new Error("Booking already processed");
        }

        booking.status = "approved";
        await booking.save({ session });

        post.availableSeats -= 1;
        await post.save({ session });

        await session.commitTransaction();
        session.endSession();

        return res.status(200).json({
            success: true,
            message: "Booking approved successfully"
        });

    } catch (error) {

        await session.abortTransaction();
        session.endSession();

        return res.status(400).json({
            success: false,
            message: error.message
        });
    }
};