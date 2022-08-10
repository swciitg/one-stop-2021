const Menu = require("../models/messMenuItem");
const LastUpadte = require("../models/lastUpdate");


exports.getAllMenuItems = (req, res) => {
  Menu.find()
    .lean()
    .exec(function (err, users) {
      res.send(JSON.stringify(users));
    });
};

exports.createMessMenu = (req, res) => {
  Menu.findOne({ hostel: req.body.hostel }).then((hostel) => {
    if (hostel) {
      res.send({ message: "Hostel Mess menu already exits" });
    } else {
      new Menu({
        hostel: req.body.hostel,
        day: req.body.day,
        meal: req.body.meal,
        menu: req.body.menu,
        timing: req.body.timing,
      })
        .save()
        .then((data) => {
          LastUpadte.deleteMany({}).then((da) => {
            new LastUpadte({
              update: new Date(),
            })
              .save()
              .then((dat) => {
                res.json(data);
              });
          });
        });
    }
  });
};

exports.updateMessMenu = (req, res) => {
  const id = req.params.id;
  Menu.findByIdAndUpdate(id, req.body, { useFindAndModify: false }).then(
    (data) => {
      LastUpadte.deleteMany({}).then((da) => {
        new LastUpadte({
          update: new Date(),
        })
          .save()
          .then((dat) => {
            res.json(data);
          });
      });
    }
  );
};

exports.deletemanyMessMenu = (req, res) => {
  const arr = req.body.id;

  if (typeof arr != "string") {
    var arr2 = Object.values(arr);
    for (const id of arr2) {
      Menu.findByIdAndDelete(id).then((data) => {});
      console.log(id);
    }
    LastUpadte.deleteMany({}).then((da) => {
      new LastUpadte({
        update: new Date(),
      })
        .save()
        .then((dat) => {
          res.send({ message: "deleted many" });
        });
    });
  } else {
    Menu.findByIdAndDelete(arr).then((data) => {
      LastUpadte.deleteMany({}).then((da) => {
        new LastUpadte({
          update: new Date(),
        })
          .save()
          .then((dat) => {
            res.send({ message: "deleted one by one" });
          });
      });
    });
  }
};
