const roleModel = require("../models/role");

exports.createRole = (req, res) => {
  roleModel.findOne({ role: req.body.role }).then((role) => {
    if (role) {
      res.send({ message: "Role already exits" });
    } 
    else {
      new roleModel
      ({
        role: req.body.role,
      })
        .save()
        .then((data) => {
          res.json(data);
        });
    }
  });
};

exports.getAllRoles = (req, res) => {
  roleModel.find().then((data) => {
    res.json(data);
  });
};

exports.updateRole = (req, res) => {
  const id = req.params.id;
  roleModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      res.json(data);
    });
};

exports.deletemanyRoles = (req,res) => {
  const arr= req.body.id;

  if(typeof(arr) != "string"){
   
    var arr2 = Object.values(arr);
     for(const id of arr2){
        roleModel.findByIdAndDelete(id).then((data)=>{});
        
     }
     res.send({message: "deleted many"});
  }else{
    roleModel.findByIdAndDelete(arr).then((data)=>{res.send({message: "deleted one of one"})});
  }
  
}
