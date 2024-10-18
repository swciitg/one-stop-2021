const contactModel = require("../models/hospitalContact");

exports.getHospitalContacts = async (req, res) => {
    try {
        const contacts = await contactModel.find().populate('name');  // name is coming form contactModel
        res.status(200).json(contacts);
    } catch (error) {
        console.log(error.message)
    }
}