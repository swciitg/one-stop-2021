import mongoose from 'mongoose';
import doctorModel from './doctorModel.js';

const contactSchema = new mongoose.Schema({
    name: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Doctor',
    },
    miscellaneous_contact: {
        type: String,
    },
    email: {
        type: String,
        default: "Unknown"
    },
    phone: {
        type: String,
        required: true,
        default: "123456789"
    },
    category: {
        type: String,
        enum: ["Permanent Doctors", "Visiting Consultant", "Miscellaneous"],
        required: true
    }
});

const contactModel = mongoose.model('HospitalContact', contactSchema);

export default contactModel;
