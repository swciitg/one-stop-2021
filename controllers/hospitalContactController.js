import Hospital from "../models/hospitalContact.js";

export async function getHospitalContacts(req, res) {
    try {
        const contacts = await Hospital.find().populate('name');  // name is coming form contactModel
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error.message)
    }
}