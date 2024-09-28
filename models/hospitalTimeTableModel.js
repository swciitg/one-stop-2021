const mongoose = require('mongoose');
const contactModel = require('./hospitalContact');

const slotSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    startTime: {
        type: String, // Storing time as string, e.g., '09:00'
        required: true
    },
    endTime: {
        type: String, // Storing time as string, e.g., '10:00'
        required: true
    }
});

const timetableSchema = new mongoose.Schema({
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'HospitalContact', // Reference to the Contact model
        required: true,
        validate : {
            validator : async value => (await contactModel.findById(value)) !== 'Miscellaneous'
        }
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
    slots: [slotSchema], // Multiple slots for a doctor on a specific day
});

const Timetable = mongoose.model('Timetable', timetableSchema);

module.exports = Timetable;
