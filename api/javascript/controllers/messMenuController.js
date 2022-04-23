const Menu = require("../models/messMenuItem");

exports.getAllMenuItems = (req,res) =>{
    Menu.find().lean().exec(function (err, users) {
        res.send(JSON.stringify(users));
   });
}