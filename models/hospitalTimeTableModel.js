const mongoose = require('mongoose');


const timetableSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor', // Reference to the Contact model
        required: true,
    },
    degree: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    category: { // OPD or Visiting Consultant
        type: String,
        enum: ['OPD', 'Visiting Consultant'],
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    startTime1 : {
        type:String,
        required: true,
        default : ""
    },
    endTime1 : {
        type:String,
        required: true,
        default : ""
    },
    startTime2 : {
        type:String,
        default : ""
    },
    endTime2 : {
        type:String,
        default : ""
    },

});

const Timetable = mongoose.model('Hospital Timetable', timetableSchema);

module.exports = Timetable;
