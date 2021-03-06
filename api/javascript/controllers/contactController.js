const contactSubsectionModel = require("../models/contactsSubsection");
const contactParentModel = require("../models/contactParent");
const timeModel = require("../models/timeModel");

/**
 * @swagger
 * /api/v0/createcontact:
 *   post:
 *     tags:
 *     - users
 *     description: Add a new user to DB
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: body
 *         in: body
 *         type: object
 *         schema:
 *           properties:
 *             category:
 *               type: string
 *             name:
 *               type: string
 *             service:
 *               type: string
 *             designation:
 *               type: string
 *             phoneNumber:
 *               type: number
 *             email:
 *               type: string
 *             websiteURL:
 *               type: string
 *
 *     responses:
 *       201:
 *         description: New user added to DB
 *       400:
 *         description: Error message(s)
 */

exports.createContact = (req, res) => {
  contactSubsectionModel
    .findOne({ email: req.body.email })
    .then((currenUser) => {
      if (currenUser) {
        res.send({ message: "Email already exits" });
      } else {
        new contactSubsectionModel({
          subsection: req.body.subsection,
          name: req.body.name,
          subsection: req.body.subsection,
          phoneNumber: req.body.phoneNumber,
          email: req.body.email,
        })
          .save()
          .then((contact) => {
            res.json(contact);
          });
      }
    });
};

//get all contacts of a subsection
exports.getAllSubsectionContacts = (req, res) => {
  contactSubsectionModel
    .find({ subsection: req.body.subsection })
    .then((contacts) => {
      if (contacts) {
        res.send(contacts);
      } else {
        res.send({ message: "does not exist" });
      }
    });
};
//get all subsections
exports.getAllSubsections = (req, res) => {
  contactParentModel
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res
        .status(500)
        .send({
          message:
            err.message || "Error Occurred while retriving user information",
        });
    });
};

exports.updateContact = (req, res) => {
  const id = req.params.id;
  contactSubsectionModel
    .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res
          .status(404)
          .send({
            message: `Cannot Update user with ${id}. Maybe user not found!`,
          });
      } else {
        timeModel.findByIdAndUpdate(id_,{contactUpdateTime: Date.now()},function(err,docs){
          res.send(data);
        })
      }
    });
};

exports.createsection = (req, res) => {
  contactParentModel.findOne({ section: req.body.section }).then((section) => {
    if (section) {
      res.send({ message: "Section already exits" });
    } else {
      new contactParentModel({
        section: req.body.section,
        subsection: req.body.subsection,
      })
        .save()
        .then((data) => {
          res.json(data);
        });
    }
  });
};

exports.deletemanyContacts = (req, res) => {
  const arr = req.body.id;

  if (typeof arr != "string") {
    var arr2 = Object.values(arr);
    for (const id of arr2) {
      contactParentModel.findByIdAndDelete(id).then((data) => {});
      console.log(id);
    }
    res.send({ message: "deleted many" });
  } else {
    contactParentModel.findByIdAndDelete(arr).then((data) => {
      res.send({ message: "deleted one of one" });
    });
  }
};
