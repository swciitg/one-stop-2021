
const formData = require("../models/khokhaEntryModel");

exports.updateNewsItem = async (req, res) => {
    try {
      const _id = req.params.id;
      const updatedform = await formData.findByIdAndUpdate(_id, {Status: false,
        entryTime: new Date,}
);

      res.send(updatedform);
    } catch (e) {
      res.status(500).send(e);
    }
  }

  exports.getItem = async (req, res) => {
    try {
      
      const getData = await formData.find({});
      res.send(getData);
    } catch (e) {
      res.status(500).send(e);
    }
  }


  exports.addentry = async(req,res) => {
    try {
        const {name,rollNumber,department,hostel,roomNumber,Course,outgoingLocation,phoneNumber,outlook,Status} =req.body

  
    const date = Date.parse(req.body.date);
  
    const newFormData = new formData({
      outlook,
      name,
      phoneNumber,
      outgoingLocation,
      rollNumber,
      roomNumber,
      hostel,
      department,
      Course,
      Status
     
    });
  
    newFormData.save()
    
    .then(() => res.json(`Success!+${newFormData}`) )
    } catch (e) {
        res.status(400).json('Error: ' + e)
    }
}