const mongoose = require("mongoose");
const { updateHomePageInLastUpdateDocument } = require("../controllers/lastUpdateController");

const quickLink = new mongoose.Schema({
    priorityNumber : { type: Number, required : true},
    title : { type: String, required : true},
    logo : { type: Number, required : true},
    url : { type: String, required : true},
});

const homePage = new mongoose.Schema({
    path : { type: String },
    clickableImageRedirectUrl : { type: String, required : true},
    quickLinks : [quickLink]
});

homePage.pre('save',async function(){
    await updateHomePageInLastUpdateDocument();
});
  
homePage.pre('findOneAndRemove',async function(){ // adminjs calls findOneAndRemove internally
    await updateHomePageInLastUpdateDocument();
});
  
homePage.pre('findOneAndUpdate',async function(){ // adminjs calls findOneAndUpdate internally
    await updateHomePageInLastUpdateDocument();
});

module.exports = mongoose.model("homePage", homePage);