const {TravelPostModel, TravelChatModel} = require("../models/campusTravelModel");
exports.postTravel = async (req,res) => {
    try{
        let datetime = new Date(req.body.travelDateTime);
        let chatModel = new TravelChatModel();
        chatModel=await chatModel.save();
        let travelModel = new TravelPostModel({"email" : req.body.email,"travelDateTime" : datetime,"to" : req.body.to,"from" : req.body.from,"margin": req.body.margin,"note" : req.body.note,"chatId" : chatModel.id});
        await travelModel.save();
        console.log(travelModel);
        res.json({"success" : true});
    }
    catch(err){
        res.json({"success" : false,"message" : err.toString()});
    }
}


function getFormattedDate(datetime){
    var options = {year: 'numeric', month: 'short', day: 'numeric' };
    let date = datetime.toLocaleDateString("en-US", options);
    console.log(date);
    let d=date[5]==',' ? parseInt(date[4]) : parseInt(date.substring(4,6));
    let suff;
    console.log(d%10,date.substring(5,7));
    if (d > 3 && d < 21) suff='th';
    else{
        switch (d % 10) {
            case 1:
                suff= "st";
                break;
            case 2:
                suff= "nd";
                break;
            case 3:
                suff= "rd";
                break;
            default:
                suff="th";
                break;
        }
    }
    date=date[5]==',' ? date.slice(0,5) + suff + date.slice(5) : date.slice(0,6) + suff + date.slice(6);
    return date;
}

exports.getTravelPosts = async (req,res) => {
    try{
        if(req.body.datetime==null){
            let travelPosts = await TravelPostModel.find();
            let datewiseTravelPost={};
            travelPosts.forEach((element) => {
                let date=getFormattedDate(element["travelDateTime"]);
                console.log(typeof(date),date);
                if(date in datewiseTravelPost){
                    datewiseTravelPost[date].push(element);
                }
                else datewiseTravelPost[date]=[element];
            });
            res.json({"success" : true,"details" : datewiseTravelPost});
        }
        else{
            let lowerDate = new Date(req.body.datetime);
            let upperDate = new Date(req.body.datetime);
            upperDate.setDate(upperDate.getDate() + 1);
            console.log(req.body);
            console.log(lowerDate,upperDate);
            let travelPosts = await TravelPostModel.find({ travelDateTime: {
                $gte: lowerDate,
                $lt: upperDate
            }, to : req.body.to, from : req.body.from});
            console.log(travelPosts);
            res.json({"success" : true,"details" : travelPosts});
        }
    }
    catch(err){
        res.json({"success" : false,"message" : err.toString()});
    }
}

exports.deleteAllTravelPosts = async (req,res) => {
    try{
        await TravelPostModel.deleteMany();
        res.json({"success" : true});
    }
    catch(err){
        res.json({"success" : false,"message" : err.toString()});
    }
}

