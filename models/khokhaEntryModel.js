const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const formSchema = new Schema({
    outlook: {
      type: String,
      required:true
    },

    name: {
     type: String, 
     required: true 
    },
    phoneNumber: {
     type: Number,
     required: true
     },

    outgoingLocation: {
     type: String,
     required: true
     },

   exitTimeDate: { 
    type: Date,
    default: new Date
   },
   rollNumber: {
    type:Number,required:true
    },
  entryTime:{
    type: Date,
    default: null
  },
  roomNumber: {
    type: String,
    
  },
  hostel: {
    type: String,
    
  },
  department:{
    type:String,
  },
  Course:{
    type:String,
    
  },
  Status:{
    type:Boolean,
    required:true
  },
  Entrytime:{
    type: String,
   
  }, 

}, {
  timestamps: true,
});

const formData = mongoose.model('formData', formSchema);

module.exports = formData;  