const contactSubsectionModel = require("../models/contactsSubsection");
const contactParentModel = require("../models/contactParent");
const timeModel = require("../models/timeModel");
const csv = require("csvtojson");
var multiparty = require("multiparty");
var form = new multiparty.Form();

exports.createContact = async (req, res) => {

  try {
    form.parse(req, function (err, fields, files) {
      console.log(files);
      let hostel = Object.keys(files)[0];
      csv()
        .fromFile(files[hostel][0].path)
        .then((sectionList) => {
          console.log("ele", sectionList);
          sectionList.forEach(async (ele) => {
            const sectionDetails = await contactParentModel.findOne({name: ele.section});
            if (sectionDetails) {
              const delData = await contactParentModel.findOneAndUpdate({name: ele.section}, {name: ele.section, contacts: []});
            }
            else {
              const newParent = new contactParentModel({
                name: ele.section
              });
  
              newParent.save();
            }

             
            

          })
   
          res.status(200).json('success');
        });
      });
 
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err
    })
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
exports.getAllSubsections = (req, res) => {
  contactParentModel
    .find()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).send({
        message:
          err.message || "Error Occurred while retriving user information",
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

exports.createsection = (req, res) => {

  try {
    form.parse(req, function (err, fields, files) {
      console.log(files);
      let hostel = Object.keys(files)[0];
      csv()
        .fromFile(files[hostel][0].path)
        .then((sectionList) => {
          console.log("ele", sectionList);
          sectionList.forEach(async (ele) => {
            const sectionDetails = await contactParentModel.findOne({name: ele.subsection});
            
            sectionDetails.contacts.push({
              groupName: ele.section,
              name: ele.name,
              contact: ele.phoneNumber,
              email: ele.email
            });

            sectionDetails.save();
             
            

          })
   
          res.status(200).json('success');
        });
      });
 
  } catch (err) {
    return res.status(500).json({
      success: false,
      error: err
    })
  }
}
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
