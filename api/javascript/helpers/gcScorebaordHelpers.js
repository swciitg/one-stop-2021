const { gcCompetitionsStoreModel } = require("../models/gcScoreboardModel");

exports.checkIfAdmin = async (email,competition) => {
    const gcScoreboardStoreArray = await gcCompetitionsStoreModel.find();
    const gcScoreboardStore = gcScoreboardStoreArray[0];
    console.log(email,competition,gcScoreboardStore);
    if((competition==='spardha' && gcScoreboardStore.spardha_admins.includes(email)) || 
    (competition==='manthan' && gcScoreboardStore.manthan_admins.includes(email)) || 
    (competition==='kriti' && gcScoreboardStore.kriti_admins.includes(email))) return true;
    return false;
}

exports.checkIfBoardAdmin = async (email,competition) => {
    const gcScoreboardStoreArray = await gcCompetitionsStoreModel.find();
    const gcScoreboardStore = gcScoreboardStoreArray[0];
    if((competition==='spardha' && gcScoreboardStore.spardha_board_admins.includes(email)) || 
    (competition==='manthan' && gcScoreboardStore.manthan_board_admins.includes(email)) || 
    (competition==='kriti' && gcScoreboardStore.kriti_board_admins.includes(email))) return true;
    return false;
}

exports.getGcScoreboardStore = async () => {
    const gcScoreboardStoreArray = await gcCompetitionsStoreModel.find();
    if(gcScoreboardStoreArray.length===0){ // if no store on first time
        console.log("here");
        gcScoreboardStoreArray = [await new gcCompetitionsStoreModel().save()];
    }
    return gcScoreboardStoreArray[0];
}