const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref : 'Doctor',
        required: true
    },
    degree: {
        type: String,
    },
    designation: {
        type:String,
    },
    email: {
        type: String,
        required : true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    category: {           
        type : String,
        enum : ["Permanent Doctors", "Visiting Consultant", "Miscellaneous"], // doctors, visiting consultant, misc
        required : true
    }
    // Add any other fields you need
});

const contactModel = mongoose.model('HospitalContact', contactSchema);

module.exports = contactModel;