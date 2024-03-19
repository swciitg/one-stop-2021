const express = require("express");
const router = express.Router();
const { restrictIfGuest, verifyUserRequest } = require('../middlewares/user.auth');

const Controller = require("../controllers/khokhEntryController")

router.patch("/khokha/:id",Controller.updateNewsItem);
router.post("/khokhaexit",verifyUserRequest,restrictIfGuest,Controller.addentry);
router.get("/khokhaitems",Controller.getItem);

module.exports = router ;

// router.route('/').get((req, res) => {
//   formData.find()
//     .then(formDatas => res.json(formDatas))
//     .catch(err => res.status(400).json('Error: ' + err));
// });

// router.route('/change').patch((req,res) => {
//   const {Status,id} = req.body;
//  const data= formData.findById(id)
//   .then(data => {
//     if(data){
//       data.updateOne({"Status": false}) 
//         if (err) throw err;
//         console.log("1 document updated");
//         res.json(data);
       
  
//       }
//       else {
//         res.status(404).json({ message: 'Document not found' });
//       }
    
//     })
     
       
    
//   if(Status == true){
//     const {outlook} = req.body;
//     const query = { outlook: outlook };
//     formData.findOne(query)

//     .then(foundFormData => {
//         if (foundFormData) {
//             foundFormData.updateOne({Status:false})
            
//             res.json(foundFormData);
//         } else {
            
//             res.status(404).json({ message: 'Document not found' });
//         }
//     })
//     .catch(err => {
        
//         console.error('Error while finding document:', err);
//         res.status(500).json({ message: 'Internal server error' });
//     });
// } else {
// res.status(400).json({ message: 'Status is not true or outlook is missing' });
// }
  
// })
// router.route('/add').post((req, res) => {
//     const {name,rollNumber,department,hostel,roomNumber,Course,outgoingLocation,phoneNumber,outlook,Status} =req.body

  
//   const date = Date.parse(req.body.date);

//   const newFormData = new formData({
//     outlook,
//     name,
//     phoneNumber,
//     outgoingLocation,
//     date,
//     rollNumber,
//     roomNumber,
//     hostel,
//     department,
//     Course,
//     Status
   
//   });

//   newFormData.save()
  
//   .then(() => res.json('Success!') )
//   .catch(err => res.status(400).json('Error: ' + err));
// });

// module.exports = router;

// const Jimp = require("jimp");

// const fs = require('fs')

// const qrCodeReader = require('qrcode-reader');
 


// router.route('/scan').patch((req,res)=>{
//   const {qrimg} = req.body;
//   // const buffer = fs.readFileSync('/output-file-path/file.png');
//  const buffer = qrimg;
 

// Jimp.read(buffer, function(err, image) {
//     if (err) {
//         console.error(err);
//     }

//     const qrCodeInstance = new qrCodeReader();

//     qrCodeInstance.callback = function(err, value) {
//         if (err) {
//             console.error(err);
//         }
//         res.json(value.result);
//         console.log(value.result);
//     };


//     qrCodeInstance.decode(image.bitmap);
// });
// } )
