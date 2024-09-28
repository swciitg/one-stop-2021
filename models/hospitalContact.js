const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: String,
        enum : ["Dr. A k Baruah", "Dr. L Baruah", "Dr. S Majumdar", "Dr. P Sarmah", "Dr. H Baishya", "Dr. P Bortamuly", "Dr. Bhaskar S Neog", "Dr. Ridip Kumar Baruah", "Mr. Kandarpa Jyoti Das", "Mrs. Rashmi Rekha Das", "Dentist"],
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    designation: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phone: {
        type: String,
        required: true
    },
    category: {           // doctors, visiting consultant, misc
        type : String,
        enum : ["Permanent Doctors", "Visiting Consultant", "Miscellaneous"],
        required : true
    }
    // Add any other fields you need
});

const contactModel = mongoose.model('HospitalContact', contactSchema);

module.exports = contactModel;