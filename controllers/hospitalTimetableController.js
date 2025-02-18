const hospitalTimetableModel = require("../models/hospitalTimeTableModel")

exports.getHospitalTimetable = async (req, res) => {
    console.log('Request received to fetch hospital timetable.');
    try {
        const timetable = await hospitalTimetableModel.find().populate('doctor');
        console.log("timetable fetch ke bad flow..")
        res.status(200).json(timetable);
    } catch (error) {
        console.error('Error fetching hospital timetable:', error);
        res.status(500).json({ error: 'Internal Server Error', details: error.message });
    }
};