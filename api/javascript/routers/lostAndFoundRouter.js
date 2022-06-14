const express = require("express");
// const { routes } = require('../routes');
const { routes } = require('../routes');
const LostAndFoundControllers = require("../controllers/lostAndFoundControllers");
const LostAndFoundRouter = express.Router();
const multer = require("multer");
const fs = require("fs");
// const { render } = require("express/lib/response");

//image upload
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       console.log("hello");
//       cb(null, './uploads');
//     },
//     filename:(req, file, cb) =>{
//       cb(null,file.originalname);
//     },
//   });
//   const uploads = multer({
//     storage: storage,
//   });

LostAndFoundRouter.get("/getImage", LostAndFoundControllers.getImage);

LostAndFoundRouter.get("/getCompressedImage", LostAndFoundControllers.getCompressedImage);

LostAndFoundRouter.get("/lost", LostAndFoundControllers.getLostDetails);

// router.get("/raise",(req,res)=>{
//     res.render("add_user");
// });

LostAndFoundRouter.post("/lost",
    LostAndFoundControllers.postLostDetails
)

LostAndFoundRouter.delete("/lost",LostAndFoundControllers.deleteLosts);

// LostAndFoundRouter.get(
//   "/delete/:id",
//   LostAndFoundControllers.deletelnfDetail
// );

LostAndFoundRouter.get("/found", LostAndFoundControllers.getfoundDetails);

// LostAndFoundRouter.get("/found",(req,res)=>{
//   res.render("addfound");
// });

LostAndFoundRouter.post("/found",
    LostAndFoundControllers.postfoundDetails
)

LostAndFoundRouter.delete("/found",LostAndFoundControllers.deleteFounds);

// router.get(
//   "/deletefound/:id",
//   LostAndFoundControllers.deletefoundDetail
// );

module.exports = { LostAndFoundRouter: LostAndFoundRouter };
