const { TravelPostModel, TravelChatModel, ReplyPostModel } = require("../models/campusTravelModel");
exports.postTravel = async (req, res) => {
    try {
        let travelDateTime = new Date(req.body.travelDateTime);
        let chatModel = new TravelChatModel();
        chatModel = await chatModel.save();
        let data = { "email": req.body.email, "name" : req.body.name, "travelDateTime": travelDateTime, "to": req.body.to, "from": req.body.from, "margin": req.body.margin, "note": req.body.note, "chatId": chatModel.id };
        if("phonenumber" in req.body) data["phonenumber"] = req.body.phonenumber;
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
        if (req.query.travelDateTime == null) {
            let travelPosts = await TravelPostModel.find().sort({"travelDateTime": 1});
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
        else {
            console.log("here", req.query.travelDateTime);
            let lowerDate = new Date(req.query.travelDateTime);
            let upperDate = new Date(req.query.travelDateTime);
            upperDate.setDate(upperDate.getDate() + 1);
            console.log(req.body);
            console.log(lowerDate, upperDate);
            let travelPosts = await TravelPostModel.find({
                travelDateTime: {
                    $gte: lowerDate,
                    $lt: upperDate
                }, to: req.query.to, from: req.query.from
            }).sort({"travelDateTime": 1});
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
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}

exports.deleteTravelPost = async (req,res) => {
    try {
        const id = req.query.travelPostId;
        let travelPost = await TravelPostModel.findById(id);
        if(travelPost["email"]!==req.body.email){
            res.json({ "success": false, "message": "Email doesn't match"});
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

exports.getMyAds = async (req,res) => {
    try {
        const email = req.query.email;
        let myTravelPosts = await TravelPostModel.find({"email" : email});
        res.json({ "success": true, "details" : myTravelPosts });
    }
    catch (err) {
        res.json({ "success": false, "message": err.toString() });
    }
}

exports.getTravelPostChatReplies = async (req,res) => {
    try{
        const id = req.query.chatId;
        console.log(id);
        let travelChat = await TravelChatModel.findById(id);
        res.json({ "success": true, "replies" : travelChat["replies"] });
    }
    catch (err){
        res.json({ "success": false, "message": err.toString() });
    }
}

exports.postReplyChat = async (req,res) => {
    try{
        const id = req.query.chatId;
        const data = req.body;
        let travelChatReply = new ReplyPostModel(data);
        let travelChat = await TravelChatModel.findById(id);
        travelChat["replies"].push(travelChatReply);
        travelChat = await travelChat.save();
        console.log(travelChat);
        res.json({ "success": true });
    }
    catch (err){
        res.json({ "success": false, "message": err.toString() });
    }
}

