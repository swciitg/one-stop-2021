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

  exports.updateMessMenu = (req, res) => {
    const id = req.params.id;
    Menu
      .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
      .then((data) => {
        res.json(data);
      });
  };
  
  exports.deletemanyMessMenu = (req, res) => {
    const arr = req.body.id;
  
    if (typeof arr != "string") {
      var arr2 = Object.values(arr);
      for (const id of arr2) {
        Menu.findByIdAndDelete(id).then((data) => {});
        console.log(id);
      }
      res.send({ message: "deleted many" });
    } else {
      Menu.findByIdAndDelete(arr).then((data) => {
        res.send({ message: "deleted one of one" });
      });
    }
  };