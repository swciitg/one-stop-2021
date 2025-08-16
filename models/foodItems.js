import mongoose from "mongoose";
import Scraper from "images-scraper";

const foodItemsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  image: String
});

// foodItemsSchema.pre('save', async function () {
//   console.log(this.image);
//   if (this.image === null) {
//     const google = new Scraper({
//       puppeteer: {
//         headless: true,
//       }
//     });
//     const imageResults = await google.scrape(newFoodOutlet.menu[i]["name"], 5);
//     this.image = imageResults[0]["url"];
//   }
// });

const foodItems = mongoose.model("foodItem", foodItemsSchema);

export default foodItems;
