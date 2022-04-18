const contactSubsectionModel = require('../models/contactsSubsection');
const contactParentModel =  require('../models/contactParent');

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
  contactSubsectionModel.findOne({ email: req.body.email }).then((currenUser) => {
    if (currenUser) {
      res.send({ message: 'Email already exits' });
    } else {
      new contactSubsectionModel({
        subsection: req.body.subsection,
        name: req.body.name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
      }).save().then(contact => {
        res.json(contact);
      });
    }
  });
};


//get all subsections
exports.getAllSubsections = (req,res) => {
  contactParentModel.find()
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
})
};

//get all contacts of a subsection
exports.getAllContacts = (req,res) => {
  contactSubsectionModel.find()
  .then(data => {
    res.json(data)
  })
  .catch(err => {
    console.log(err)
    res.status(500).send({ message : err.message || "Error Occurred while retriving user information" })
})
};

exports.updateContact = (req, res) => {
  const { id } = req.params.id;
  contactSubsectionModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Update user with ${id}. Maybe user not found!` });
      } else {
        res.send(data);
      }
    });
};

exports.deleteContact = (req, res) => {
  const { id } = req.params;

  contactSubsectionModel.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Cannot Delete with id ${id}. Maybe id is wrong` });
      } else {
        res.send({
          message: 'User was deleted successfully!',
        });
      }
    });
};

