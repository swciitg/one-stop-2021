const Menu = require("../models/messMenuItem");

exports.getAllMenuItems = (req,res) =>{
    Menu.find().lean().exec(function (err, users) {
        res.send(JSON.stringify(users));
   });
}

exports.createMessMenu = (req, res) => {
    Menu.findOne({ hostel: req.body.hostel }).then((hostel) => {
      if (hostel) {
        res.send({ message: 'Hostel Mess menu already exits' });
      } else {
        new Menu({
            hostel :req.body.hostel,
            day    :req.body.day,
            meal   :req.body.meal  ,
            menu   :req.body.menu ,
            timing :req.body.timing
          
        }).save().then(data => {
          res.json(data);
        });
      }
    });
  };