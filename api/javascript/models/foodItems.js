const mongoose = require('mongoose');

const { Schema } = mongoose;

const foodItemsSchema = new Schema({

    name: String,
    ingredients : [String],
    waiting_time: Number,
    price: Number,
    veg: Boolean,
    image : String,

});

const foodItems = mongoose.model('foodItem', foodItemsSchema);

module.exports = foodItems;
