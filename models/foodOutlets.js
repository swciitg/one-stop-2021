const mongoose = require("mongoose");
const foodItems = require("./foodItems");
var Scraper = require("images-scraper");
const { updateFoodOutletInLastUpdateDocument } = require("../controllers/lastUpdateController");

const foodItemSchema = new mongoose.Schema({
  itemName: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  imageURL: {
    type: String,
    default: ''
  }
});

const foodOutletsSchema = new mongoose.Schema({
  outletName: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    required: true
  },
  closingTime: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    required: true,
    min: [1000000000, "Invalid mobile number."],
    max: [9999999999, "Invalid mobile number."],
  },
  location: {
    type: String,
    required: true
  },
  latitude: {
    type: Number,
    required: true
  },
  longitude: {
    type: Number,
    required: true
  },
  tags: [{
    type: String,
    required: true
  }],
  menu: [foodItemSchema],
  imageURL: {
    type: String
  }
});

foodOutletsSchema.pre('findOneAndRemove',async function(){ // adminjs calls findOneAndRemove internally
  await updateFoodOutletInLastUpdateDocument();
});

foodOutletsSchema.pre('save',async function(){
  await updateFoodOutletInLastUpdateDocument();
  console.log(this.menu);
  const google = new Scraper({
    puppeteer: {
      executablePath: '/usr/bin/google-chrome',
      headless: true,
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
      ]
    }
  });
  for(let i=0;i<this.menu.length;i++){
    console.log(this.menu[i]);
    console.log(this.menu[i]["imageURL"]);
    if(!this.menu[i]["imageURL"] || this.menu[i]["imageURL"].length==0){
      console.log("INSIDE HERE");
      const imageResults = await google.scrape(this.menu[i]["itemName"],1);
      console.log(imageResults);
      this.menu[i]["imageURL"] = imageResults[0]["url"];
      console.log(imageResults);
    }
  }
});

foodOutletsSchema.pre('findOneAndUpdate',async function(){ // // adminjs calls findOneAndUpdate internally
  await updateFoodOutletInLastUpdateDocument();
  const google = new Scraper({
    puppeteer: {
      executablePath: '/usr/bin/google-chrome',
      headless: true,
      args: [
        "--disable-gpu",
        "--disable-dev-shm-usage",
        "--disable-setuid-sandbox",
        "--no-sandbox",
      ]
    }
  });
  for(let i=0;i<this["_update"]['$set']['menu'].length;i++){
    console.log(this["_update"]['$set']['menu']);
    console.log(this["_update"]['$set']['menu'][i]["imageURL"]);
    if(!this["_update"]['$set']['menu'][i]["imageURL"].length===0 || this["_update"]['$set']['menu'][i]["imageURL"].length===0){
      const imageResults = await google.scrape(this["_update"]['$set']['menu'][i]["itemName"],1);
      this["_update"]['$set']['menu'][i]["imageURL"] = imageResults[0]["url"];
      console.log(imageResults);
    }
  }
});

const foodOutlets = mongoose.model("foodOutlet", foodOutletsSchema);

module.exports = foodOutlets;
