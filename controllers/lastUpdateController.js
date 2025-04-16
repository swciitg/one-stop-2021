import LastUpdate from "../models/lastUpdate.js";

export const createLastUpdateDocument = async function() {
    if((await LastUpdate.find()).length !== 0) return; // if last update document is already there
    console.log("CREATED LAST UPDATE DOCUMENT");
    await LastUpdate.deleteMany({}); // delete existing document
    let addUpdate = LastUpdate();
    await addUpdate.save();
};

export const updateFoodOutletInLastUpdateDocument = async function() {
    console.log("UPDATED FOOD OUTLET IN LAST UPDATE DOCUMENT");
    let updatesList = await LastUpdate.find();
    await LastUpdate.findByIdAndUpdate(updatesList[0]._id, {foodOutlet: new Date}, {runValidators: true});
};

export const updateMessMenuInLastUpdateDocument = async function() {
    console.log("UPDATED MESS MENU IN LAST UPDATE DOCUMENT");
    let updatesList = await LastUpdate.find();
    await LastUpdate.findByIdAndUpdate(updatesList[0]._id, {messMenu: new Date}, {runValidators: true});
};

export const updateTimingInLastUpdateDocument = async function() {
    console.log("UPDATED TIMING IN LAST UPDATE DOCUMENT");
    let updatesList = await LastUpdate.find();
    await LastUpdate.findByIdAndUpdate(updatesList[0]._id, {timing: new Date}, {runValidators: true});
};

export const updateContactInLastUpdateDocument = async function() {
    console.log("UPDATED CONTACT IN LAST UPDATE DOCUMENT");
    let updatesList = await LastUpdate.find();
    await LastUpdate.findByIdAndUpdate(updatesList[0]._id, {contact: new Date}, {runValidators: true});
};

export const updateHomePageInLastUpdateDocument = async function() {
    console.log("UPDATED HOME PAGE IN LAST UPDATE DOCUMENT");
    let updatesList = await LastUpdate.find();
    await LastUpdate.findByIdAndUpdate(updatesList[0]._id, {homePage: new Date}, {runValidators: true});
};