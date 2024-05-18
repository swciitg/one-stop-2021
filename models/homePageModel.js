const mongoose = require("mongoose");
const {updateHomePageInLastUpdateDocument} = require("../controllers/lastUpdateController");

const quickLink = new mongoose.Schema({
    priorityNumber: {type: Number, required: true},
    title: {type: String, required: true},
    logo: {type: Number, required: true},
    url: {type: String, required: true},
});

const homeScreenCard = new mongoose.Schema({
    imagePath: {type: String},
    redirectUrl: {type: String, default: ""}
});

const homePage = new mongoose.Schema({
    cardsDataList: [homeScreenCard],
    quickLinks: [quickLink]
});

homePage.pre('save', async function () {
    await updateHomePageInLastUpdateDocument();
});

homePage.pre('findOneAndRemove', async function () { // adminjs calls findOneAndRemove internally
    await updateHomePageInLastUpdateDocument();
});

homePage.pre('findOneAndUpdate', async function () { // adminjs calls findOneAndUpdate internally
    await updateHomePageInLastUpdateDocument();
});

module.exports = mongoose.model("homePage", homePage);