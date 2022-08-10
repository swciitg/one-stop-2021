const mongoose = require("mongoose");

const { Schema } = mongoose;

const lastUpdateSchema = new Schema({
  update: Date,
});

const lastUpdate = mongoose.model("last_update", lastUpdateSchema);

module.exports = lastUpdate;
    