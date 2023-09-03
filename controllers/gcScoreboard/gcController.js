const { getGcScoreboardStore,} = require("../../helpers/gcScoreboardHelpers");
const { gcCompetitionsStoreModel} = require("../../models/gcModels/spardhaModel");

exports.postCompetitionAdmins = async (req, res) => {
    try {
        const competition = req.params.competition;
        const emails = req.body.emails;
        if(emails===undefined || competition===undefined){
            res.status(400).json({ "success": false, "message": "Not Valid parameters in request"});
            return;
        }
        const gcScoreboardStore = await getGcScoreboardStore();
        if (competition == "spardha") gcScoreboardStore.spardha_admins = emails;
        else if (competition == "manthan") gcScoreboardStore.manthan_admins = emails;
        else if(competition=="kriti") gcScoreboardStore.kriti_admins = emails;
        else if(competition=="sahyog") gcScoreboardStore.sahyog_board_admins = emails;
        else{
            res.status(400).json({ "success": false, "message": "No such competiton exists"});
            return;
        }
        console.log(gcScoreboardStore);
        await gcScoreboardStore.save();
        // await gcCompetitionsStoreModel.findByIdAndUpdate(gcScoreboardStore["_id"], gcScoreboardStore);
        res.status(200).json({ "success": true, "message": `admins updated successfully to ${competition} admin list` });
    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
        return;
    }
}

exports.postCompetitionBoardAdmins = async (req, res) => {
    try {
        const competition = req.params.competition;
        const emails = req.body.emails;
        if(emails===undefined || competition===undefined){
            res.status(400).json({ "success": false, "message": "Not valid parameters in request"});
            return;
        }
        const gcScoreboardStore = await getGcScoreboardStore();
    
        if (competition == "spardha") gcScoreboardStore.spardha_board_admins = emails;
        else if (competition == "manthan") gcScoreboardStore.manthan_board_admins = emails;
        else if(competition=="kriti") gcScoreboardStore.kriti_board_admins = emails;
        else if(competition=="sahyog") gcScoreboardStore.sahyog_board_admins = emails;
        else{
            res.status(400).json({ "success": false, "message": "No such competiton exists"});
            return;
        }
        console.log(gcScoreboardStore);
        await gcScoreboardStore.save();
        res.status(200).json({ "success": true, "message": `admins updated successfully to ${competition} board admin list` });

    } catch (err) {
        res.status(500).json({ "success": false, "message": err.toString() });
        return;
    }
}


