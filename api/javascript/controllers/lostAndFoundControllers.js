const lostAndFoundDetails = require("../models/lostAndFoundModels");
const foundDetails = require("../models/foundModels");
const fs = require("fs");

exports.getlostAndFoundDetails = async (req, res) => {
    try {
    const details = await lostAndFoundDetails.find();
    details.sort((a, b) => (a.creation > b.creation ? -1 : 1));
    return res.json({"details" : details});
    } catch (error) {
      console.log(error.message);
    }
};


  exports.addlostAndFoundForm = async (req, res) => {
    try {
      return res.render("add_user");
    } catch (error) {
      console.log(error.message);
    }
  };

  exports.postlostAndFoundDetails = async (req, res) => {
     
    try {
      var { title, date, category, location, phonenumber, description,link} = req.body;
  
    //   const image = req.file ? req.file.filename : link;
     
    //   if (!image) {
    //     console.log("error", "Please attach your pdf!!");
    //     return res.redirect("/lostAndFound/raise");
    //   }
      //console.log(path);
      const newlostAndFoundDetail = await new lostAndFoundDetails({
        title, 
        date, 
        category, 
        location, 
        phonenumber, 
        description,
        link, 
      }).save();
      if (!newlostAndFoundDetail) {
        
        res.redirect("/lostAndFound/raise");
        
      }
     
      return res.json({"saved_successfully" : true});
    } catch (error) {
      console.log(error.message);
      return res.json({"saved_successfully" : false});
    }
  };

  exports.deletelostAndFoundDetail = async (req, res) => {
    const id = req.params.details_id;
    lostAndFoundDetails.findOneAndDelete(id, (err, result) => {
      if (result.link != "") {
        try {
          fs.unlinkSync("./uploads/" + result.link);
        } catch (err) {
          console.log(err);
        }
      }
      if (err) {
        res.json({ message: err.message });
      } else {
        res.redirect(`/lostAndFound`);
      }
    });
  };



  // found details

  exports.getfoundDetails = async (req, res) => {
    try {
    const details = await foundDetails.find();
    details.sort((a, b) => (a.creation > b.creation ? -1 : 1));
    
    return res.json({"details" : details});
    } catch (error) {
      console.log(error.message);
    }
  };


  exports.addfoundForm = async (req, res) => {
    try {
      return res.render("addfound");
    } catch (error) {
      console.log(error.message);
    }
  };

  exports.postfoundDetails = async (req, res) => {
    // console.log(req.body);
    try {
      var { title, date, location,submittedat, description,link} = req.body;
      
    //   const image = req.file ? req.file.filename : link;
     
    //   if (!image) {
    //     console.log("error", "Please attach your pdf!!");
    //     return res.redirect("/lostAndFound/found");
    //   }
      //console.log(path);
      const newfoundDetail = await new foundDetails({
        title, 
        date, 
        location, 
        submittedat, 
        description,
        link, 
      }).save();
      if (!newfoundDetail) {
        
        res.redirect("/lostAndFound/found");
        
      }
     
      return res.json({"saved_successfully" : true});
    } catch (error) {
      console.log(error.message);
      return res.json({"saved_successfully" : false});
    }
  };


  exports.deletefoundDetail = async (req, res) => {
    const id = req.params.details_id;
    foundDetails.findOneAndDelete(id, (err, result) => {
      if (result.link != "") {
        try {
          fs.unlinkSync("./uploads/" + result.link);
        } catch (err) {
          console.log(err);
        }
      }
      if (err) {
        res.json({ message: err.message });
      } else {
        res.redirect(`/lostAndFound`);
      }
    });
  };

