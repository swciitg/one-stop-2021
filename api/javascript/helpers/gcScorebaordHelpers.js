const { gcCompetitionsStoreModel, gcHostelWisePoints } = require("../models/gcScoreboardModel");

let allIITGHostels = ["Brahmaputra","Kameng","Dihing","Barak","Kapili","Lohit","Manas","Married Scholars","Siang","Subansiri","Umiam","Dhansiri","Disang (Men)","Disang (Women)"];

async function fetchGcScoreboardStore(){
    let gcScoreboardStoreArray = await gcCompetitionsStoreModel.find();
    if(gcScoreboardStoreArray.length===0){ // if no store on first time
        let createdGcScoreboardStore = gcCompetitionsStoreModel();
        allIITGHostels.forEach((hostelName) => {
            createdGcScoreboardStore["overallGcStandings"].push(gcHostelWisePoints({"hostelName" : hostelName}));
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
    (competition==='kriti' && gcScoreboardStore.kriti_admins.includes(email))) return true;
    return false;
}

exports.checkIfBoardAdmin = async (email,competition) => {
    const gcScoreboardStore = await fetchGcScoreboardStore();
    console.log(gcScoreboardStore.spardha_board_admins,email);
    if((competition==='spardha' && gcScoreboardStore.spardha_board_admins.includes(email)) || 
    (competition==='manthan' && gcScoreboardStore.manthan_board_admins.includes(email)) || 
    (competition==='kriti' && gcScoreboardStore.kriti_board_admins.includes(email))) return true;
    return false;
}

exports.getGcScoreboardStore = async () => {
    return await fetchGcScoreboardStore();
}