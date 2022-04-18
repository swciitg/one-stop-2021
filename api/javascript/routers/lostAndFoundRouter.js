const express = require("express");
// const { routes } = require('../routes');
const { routes } = require('../routes');
const lostAndFoundControllers = require("../controllers/lostAndFoundcontrollers");
const lostAndFoundRouter = express.Router();
const multer = require("multer");
const lostAndFoundDetails = require("../models/lostAndFoundModels");
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

lostAndFoundRouter.get("/all_lost", lostAndFoundControllers.getlostAndFoundDetails);

// router.get("/raise",(req,res)=>{
//     res.render("add_user");
// });

lostAndFoundRouter.post("/raisepost",
    lostAndFoundControllers.postlostAndFoundDetails
)

// lostAndFoundRouter.get(
//   "/delete/:id",
//   lostAndFoundControllers.deletelostAndFoundDetail
// );

lostAndFoundRouter.get("/all_found", lostAndFoundControllers.getfoundDetails);

// lostAndFoundRouter.get("/found",(req,res)=>{
//   res.render("addfound");
// });

lostAndFoundRouter.post("/foundpost",
    lostAndFoundControllers.postfoundDetails
)

// router.get(
//   "/deletefound/:id",
//   lostAndFoundControllers.deletefoundDetail
// );

module.exports = { lostAndFoundRouter: lostAndFoundRouter };
