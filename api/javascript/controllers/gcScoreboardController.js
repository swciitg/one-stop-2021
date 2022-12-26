
const {spardhaScoreModel} = require("../models/gcScoreboardModel")
// Spardha

// Spardha - user
exports.createSpardhaEvent = async (req,res) => {
    try{
        let spardhaEvent = new spardhaScoreModel(req.body);
        await spardhaEvent.save();
        res.json({"success" : true});
    }
    catch(err){
        res.status(400).json({"success" : false,"message" : err.toString()});
    }
};
// Spardha - admin
exports.addResultSpardha = async (req,res) => {
    try{
        let spardhaEvent = new spardhaScoreModel(req.body);
        await spardhaEvent.save();
        res.json({"success" : true});
    }
    catch(err){
        res.status(400).json({"success" : false,"message" : err.toString()});
    }
};
