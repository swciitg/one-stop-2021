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

exports.deleteRole = (req, res) => {
  const id = req.params.id;
  roleModel.findByIdAndDelete(id).then((data) => {
    res.send({
      message: "Role was deleted successfully!",
    });
  });
};
