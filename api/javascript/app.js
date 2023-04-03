require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const routers = require("./routers");
const LastUpdate = require("./models/lastUpdate");
const { BASEURL, ADMINPANELROOT } = require("./helpers/constants");
const { adminJsRouter } = require("./admin_panel/admin-config");
const app = express();

// admin panel router

app.use(ADMINPANELROOT,adminJsRouter);

// setting ejs as view engine

app.set("view engine", "ejs");

//for serving static files
app.use(express.static("public"));

// connect to mongodb

mongoose.set('strictQuery',false)

mongoose.connect(process.env.DATABASE_URI);

app.use(express.json({
  limit: "50mb",
  extended:true
}));
app.use(express.urlencoded({ extended: true }));

// enable CORS
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Methods",
    "GET,HEAD,OPTIONS,POST,PUT,DELETE"
  );
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  next();
});

// Validate API Call

app.use((req,res,next) => {
  console.log(req.headers);
  console.log(req);
  if(req.method!=="GET" && req.originalUrl.split("/").includes("v2") && req.headers["security-key"]!==process.env.SECURITY_KEY){
    res.json({"message":"You are not authorized"});
    return;
  }
  next();
});

// API routers

app.use(BASEURL, routers.userRouter.userRouter);
app.use(BASEURL, routers.authRouter.authRouter);
app.use(BASEURL, routers.contactRouter.contactRouter);
app.use(BASEURL, routers.timingRouter.timingRouter);
app.use(BASEURL, routers.emailRouter.emailRouter);
app.use(BASEURL, routers.roleRouter.roleRouter);
app.use(BASEURL, routers.foodOutletsRouter.foodOutletsRouter);
app.use(BASEURL, routers.foodItemsRouter.foodItemsRouter);
app.use(BASEURL, routers.messMenuRouter.messMenuRouter);
app.use(BASEURL, routers.LostAndFoundRouters.LostAndFoundRouter);
app.use(BASEURL, routers.updateRouter.updateRouter);
app.use(BASEURL, routers.buyAndSellRouter.buyAndSellRouter);
app.use(BASEURL, routers.imageRouter.imageRouter);
app.use(BASEURL, routers.newsRouter.newsRouter);
app.use(BASEURL, routers.campusTravelRouter.campusTravelRouter);
app.use(BASEURL, routers.upspRouter);
app.use(BASEURL, routers.onestopUserRouter);
app.use(BASEURL, routers.notificationRouter);
app.use(BASEURL, routers.gcScoreboardRouter.gcScoreboardRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT,async () => {
  console.log(`Express server listening on port ${PORT} see docs at /docs`);
  let updatesList = await LastUpdate.find();
  if(updatesList.length==0){
    let addUpdate = new LastUpdate({"food" : Date(), "menu" : Date(), "travel" : Date(), "contact" : Date()});
    await addUpdate.save();
  }
});
