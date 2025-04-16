import mongoose from "mongoose";
import { updateHomePageInLastUpdateDocument } from "../controllers/lastUpdateController.js";

const quickLink = new mongoose.Schema({
    priorityNumber: {type: Number, required: true},
    title: {type: String, required: true},
    logo: {type: Number, required: true},
    url: {type: String, required: true},
});

const homeScreenCard = new mongoose.Schema({
    imageUrl: {type: String},
    redirectUrl: {type: String, default: ""},
    priorityNumber: {type: Number, required: true},
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

export default mongoose.model("homePage", homePage);