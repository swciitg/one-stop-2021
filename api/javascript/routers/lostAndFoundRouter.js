const express = require("express");
// const { routes } = require('../routes');
const { routes } = require('../routes');
const LostAndFoundControllers = require("../controllers/LostAndFoundcontrollers");
const LostAndFoundRouter = express.Router();
const multer = require("multer");
const LostDetails = require("../models/LostModels");
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

LostAndFoundRouter.get("/all_lost", LostAndFoundControllers.getLostDetails);

// router.get("/raise",(req,res)=>{
//     res.render("add_user");
// });

LostAndFoundRouter.post("/raisepost",
    LostAndFoundControllers.postLostDetails
)

// LostAndFoundRouter.get(
//   "/delete/:id",
//   LostAndFoundControllers.deletelnfDetail
// );

LostAndFoundRouter.get("/all_found", LostAndFoundControllers.getfoundDetails);

// LostAndFoundRouter.get("/found",(req,res)=>{
//   res.render("addfound");
// });

LostAndFoundRouter.post("/foundpost",
    LostAndFoundControllers.postfoundDetails
)

// router.get(
//   "/deletefound/:id",
//   LostAndFoundControllers.deletefoundDetail
// );

module.exports = { LostAndFoundRouter: LostAndFoundRouter };
