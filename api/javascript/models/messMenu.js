const mongoose = require('mongoose');

const { Schema } = mongoose;

const messMenuSchema = new Schema({ 
    
  hostel    : String,
  Monday    : 
  { type: [{
    breakfast :  { type: String },
    lunch     :  { type: String },
    dinner    :  { type: String },
  }]},

  Tuesday   : 
  { type: [{
    breakfast :  { type: String },
    lunch     :  { type: String },
    dinner    :  { type: String },
  }]},

  Wednesday : 
  { type: [{
    breakfast :  { type: String },
    lunch     :  { type: String },
    dinner    :  { type: String },
  }]},

  Thrusday  : 
  { type: [{
    breakfast :  { type: String },
    lunch     :  { type: String },
    dinner    :  { type: String },
  }]},

  Friday    : 
  { type: [{
    breakfast :  { type: String },
    lunch     :  { type: String },
    dinner    :  { type: String },
  }]},

  Saturday  : 
  { type: [{
    breakfast :  { type: String },
    lunch     :  { type: String },
    dinner    :  { type: String },
  }]},

  Sunday    : 
  { type: [{
    breakfast :  { type: String },
    lunch     :  { type: String },
    dinner    :  { type: String },
  }]},

});

const messMenu = mongoose.model('messMenu', messMenuSchema);

module.exports = messMenu;
