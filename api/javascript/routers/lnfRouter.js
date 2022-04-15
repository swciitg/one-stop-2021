const express = require("express");
// const { routes } = require('../routes');
const { routes } = require('../routes');
const lnfControllers = require("../controllers/lnfcontrollers");
const lnfRouter = express.Router();
const multer = require("multer");
const lnfDetails = require("../models/lnfModels");
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

lnfRouter.get("/all_lost", lnfControllers.getlnfDetails);

// router.get("/raise",(req,res)=>{
//     res.render("add_user");
// });

lnfRouter.post("/raisepost",
    lnfControllers.postlnfDetails
)

// lnfRouter.get(
//   "/delete/:id",
//   lnfControllers.deletelnfDetail
// );

lnfRouter.get("/all_found", lnfControllers.getfoundDetails);

// lnfRouter.get("/found",(req,res)=>{
//   res.render("addfound");
// });

lnfRouter.post("/foundpost",
    lnfControllers.postfoundDetails
)

// router.get(
//   "/deletefound/:id",
//   lnfControllers.deletefoundDetail
// );

module.exports = { lnfRouter: lnfRouter };
