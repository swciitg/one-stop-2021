const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        // enum : ["Dr. A k Baruah; MD(Internal Medicine); Designation", "Dr. L Baruah", "Dr. S Majumdar; MBBS, DCH; Sr. Medical Officier & HoS", "Dr. P Sarmah", "Dr. H Baishya", "Dr. P Bortamuly", "Dr. Bhaskar S Neog", "Dr. Ridip Kumar Baruah", "Mr. Kandarpa Jyoti Das", "Mrs. Rashmi Rekha Das", "Dentist"],
        ref : 'Doctor',
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    designation: {
        type:String,
        required: true
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