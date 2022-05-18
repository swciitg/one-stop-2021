const mongoose = require("mongoose");

const LostandFoundDetailsSchema = new mongoose.Schema({
    title: { type: String, required: true },
    date: { type: Date, default: Date.now},
    location: { type: String, required: true },
    phonenumber: { type: String, required: true },
    description: { type: String, required: true },
    photo_id: { type: String, required: true },
    imageURL: { type: String, required: true },
});

module.exports = mongoose.model("LostItem", LostandFoundDetailsSchema);

// const mongoose = require("mongoose");

// const LostandFoundDetailsSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     date: { type: Date, default: Date.now},
//     location: { type: String, required: true },
//     phonenumber: { type: String, required: true },
//     description: { type: String, required: true },
//     link: { type: String, required: true },
 
    
// });

// module.exports = mongoose.model("LostandFoundDetails", LostandFoundDetailsSchema);
