const mongoose = require("mongoose");

const messMenuItemModelSchema = new mongoose.Schema({
    hostel: { type: String, required: true },
    day: { type: Date, required: true },
    meal: { type: String, required: true },
    menu: { type: String, required: true },
    timing: { type: String, required: true },
   
    
});

module.exports = mongoose.model("messMenuItemModelDetails", messMenuItemModelSchema);
