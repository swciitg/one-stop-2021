const contactSubsectionModel = require("../models/contactsSubsection");
const contactParentModel = require("../models/contactParent");
const timeModel = require("../models/timeModel");
const csv = require("csvtojson");
var multiparty = require("multiparty");
var form = new multiparty.Form();
const LastUpdate = require("../models/lastUpdate");


exports.createsection = async (req, res) => {
  console.log("hjkhsd");
  try {
    form.parse(req, async function (err, fields, files) {
      console.log(files);
      let hostel = Object.keys(files)[0];
      await contactParentModel.deleteMany();
      csv()
        .fromFile(files[hostel][0].path)
        .then((sectionList) => {
          console.log("ele", sectionList[0]);
          sectionList.forEach(async (ele) => {
            const newParent = new contactParentModel({
              name: ele.section,
            });
            newParent.save();
          });

          res.status(200).json("success");
        });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }

  // contactSubsectionModel
  //   .findOne({ email: req.body.email })
  //   .then((currenUser) => {
  //     if (currenUser) {
  //       res.send({ message: "Email already exits" });
  //     } else {
  //       const newcontact = new contactSubsectionModel({
  //         group: req.body.group,
  //         name: req.body.name,
  //         email: req.body.email,
  //         contact: req.body.contact,
  //       });
  //       newcontact.save().then((data) => {
  //         contactParentModel
  //           .findOneAndUpdate(
  //             { name: req.body.group },
  //             { $push: { contacts: newcontact } }
  //           )
  //           .then((data) => {
  //             res.send({ message: "successfulyy added" });
  //           })
  //           .catch((err) => {
  //             res.send({ message: "error" });
  //           });
  //       });
  //     }
  //   });
};

//get all contacts of a subsection
// exports.getAllSubsectionContacts = (req, res) => {
//   contactSubsectionModel
//     .find({ subsection: req.body.subsection })
//     .then((contacts) => {
//       if (contacts) {
//         res.send(contacts);
//       } else {
//         res.send({ message: "does not exist" });
//       }
//     });
// };
//get all contacts
exports.getAllContacts = (req, res) => {
  contactParentModel
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message: err.message || "Error Occurred while retriving user information",
      });
    });
};
// exports.updateContact = (req, res) => {
//   const id = req.params.id;
//   contactSubsectionModel
//     .findByIdAndUpdate(id, req.body, { useFindAndModify: false })
//     .then((data) => {
//       if (!data) {
//         res
//           .status(404)
//           .send({
//             message: `Cannot Update user with ${id}. Maybe user not found!`,
//           });
//       } else {
//         timeModel.findByIdAndUpdate(id_,{contactUpdateTime: Date.now()},function(err,docs){
//           res.send(data);
//         })
//       }
//     });
// };name

exports.createContact = (req, res) => {
  console.log("hgifd");
  try {
    form.parse(req, function (err, fields, files) {
      console.log(files);
      let file = Object.keys(files)[0];
      csv()
        .fromFile(files[file][0].path)
        .then(async (sectionList) => {
          console.log("ele", sectionList);
          let contactsParentList = await contactParentModel.find();
          console.log(contactsParentList);
          sectionList.forEach((listItem) => {
            console.log(listItem.subsection);
            let corresSectionIndex = -1;
            contactsParentList.find((ele, idx) => {
              if (ele.name === listItem.subsection) corresSectionIndex = idx;
              return ele.name === listItem.subsection;
            });
            console.log(corresSectionIndex);
            if (corresSectionIndex >= 0) {
              console.log("here fjksd");
              let contactIndex = -1;
              console.log(contactsParentList[corresSectionIndex]);
              contactsParentList[corresSectionIndex].contacts.find((ele, idx) => {
                console.log(ele);
                if (ele.name === listItem.name) {
                  console.log("I am");
                  contactIndex = idx;
                }
                return ele.name === listItem.name;
              });
              console.log("jmgldkf", contactIndex);
              if (contactIndex >= 0) {
                console.log("here", contactIndex);
                contactsParentList[corresSectionIndex].contacts[contactIndex] = listItem;
              } else {
                contactsParentList[corresSectionIndex].contacts.push(listItem);
              }
            }
          });
          console.log(contactsParentList);
          contactsParentList.forEach(async (section) => {
            await section.save();
          });
          let updatesList = await LastUpdate.find();
          console.log(updatesList);
          await LastUpdate.findByIdAndUpdate(updatesList[0].id, {
            contact: new Date(),
          });
          res.status(200).json("success");
        });
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err,
    });
  }
};
//   contactParentModel.findOne({ name: req.body.name }).then((section) => {
//     if (section) {
//       res.send({ message: "Section already exits" });
//     } else {
//       console.log(req.body);
//       new contactParentModel({
//         name: req.body.name,
//         group: req.body.group,
//         contacts: req.body.contacts,
//       })
//         .save()
//         .then((data) => {
//           res.json(data);
//         });
//     }
//   });
// };