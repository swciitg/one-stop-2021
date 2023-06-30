const LastUpdate = require("../models/lastUpdate");

exports.createLastUpdateDocument = async function(){
    console.log("CREATED LAST UPDATE DOCUMENT");
    await LastUpdate.deleteMany({}); // delete existing document
    let addUpdate = LastUpdate();
    await addUpdate.save();
}

exports.updateFoodOutletInLastUpdateDocument = async function(){
    console.log("UPDATED FOOD OUTLET IN LAST UPDATE DOCUMENT");
    let updatesList = await LastUpdate.find();
    await LastUpdate.findByIdAndUpdate(updatesList[0]._id,{foodOutlet : new Date});
}

exports.updateMessMenuInLastUpdateDocument = async function(){
    console.log("UPDATED MESS MENU IN LAST UPDATE DOCUMENT");
    let updatesList = await LastUpdate.find();
    await LastUpdate.findByIdAndUpdate(updatesList[0]._id,{messMenu : new Date});
}

exports.updateTimingInLastUpdateDocument = async function(){
    console.log("UPDATED TIMING IN LAST UPDATE DOCUMENT");
    let updatesList = await LastUpdate.find();
    await LastUpdate.findByIdAndUpdate(updatesList[0]._id,{timing : new Date});
}

exports.updateContactInLastUpdateDocument = async function(){
    console.log("UPDATED CONTACT IN LAST UPDATE DOCUMENT");
    let updatesList = await LastUpdate.find();
    await LastUpdate.findByIdAndUpdate(updatesList[0]._id,{contact : new Date});
}