const { gcCompetitionsStoreModel, gcHostelWisePoints } = require("../models/gcModels/gcModel");
const { allIITGHostelsGC } = require("./constants");

async function fetchGcScoreboardStore(){
    let gcScoreboardStoreArray = await gcCompetitionsStoreModel.find();
    if(gcScoreboardStoreArray.length===0){ // if no store on first time
        let createdGcScoreboardStore = gcCompetitionsStoreModel();
        allIITGHostelsGC.forEach((hostelName) => {
            createdGcScoreboardStore["overallGcStandings"].push(gcHostelWisePoints({"hostelName" : hostelName,"spardha_points":0,"kriti_points":0,"manthan_points":0,"sahyog_points":0}));
        });
        await createdGcScoreboardStore.save();
        gcScoreboardStoreArray = [createdGcScoreboardStore];
    }
    return gcScoreboardStoreArray[0];
}

exports.checkIfAdmin = async (email,competition) => {
    const gcScoreboardStore = await fetchGcScoreboardStore();
    console.log(email,competition,gcScoreboardStore);
    if((competition==='spardha' && gcScoreboardStore.spardha_admins.includes(email)) || 
    (competition==='manthan' && gcScoreboardStore.manthan_admins.includes(email)) || 
    (competition==='kriti' && gcScoreboardStore.kriti_admins.includes(email)) ||
    (competition==='sahyog' && gcScoreboardStore.sahyog_admins.includes(email))) return true;
    return false;
}

exports.checkIfBoardAdmin = async (email,competition) => {
    const gcScoreboardStore = await fetchGcScoreboardStore();

    if((competition==='spardha' && gcScoreboardStore.spardha_board_admins.includes(email)) || 
    (competition==='manthan' && gcScoreboardStore.manthan_board_admins.includes(email)) || 
    (competition==='kriti' && gcScoreboardStore.kriti_board_admins.includes(email)) || 
    (competition==='sahyog' && gcScoreboardStore.sahyog_board_admins.includes(email))) return true;
    return false;
}

exports.getGcScoreboardStore = async () => {
    return await fetchGcScoreboardStore();
}

exports.ifValidEvent = async (event,competition) => {
    const gcScoreboardStore = await fetchGcScoreboardStore();
    if(competition==="spardha" && gcScoreboardStore.spardha_events.includes(event) ||
    competition==="manthan" && gcScoreboardStore.manthan_events.includes(event) ||
    competition==="kriti" && gcScoreboardStore.kriti_events.includes(event) || 
    (competition==='sahyog' && gcScoreboardStore.sahyog_events.includes(event))) return true;
    return false;
}