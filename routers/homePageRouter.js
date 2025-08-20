import multer from 'multer';
import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import * as homePageController from "../controllers/homePageController.js";
import homePage from "../models/homePageModel.js";

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const homePageRouter = express.Router();

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './images_folder/')
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
})
var upload = multer({ storage: storage })

// close this route next time. 
homePageRouter.get("/quickLinks", homePageController.getQuickLinksData);

homePageRouter.get("/homepage", homePageController.getHomePageData);

homePageRouter.post("/homepage", upload.single('image'), async (req, res, next) => {
    let homePageDoc = await homePage.find();
    await homePage.findByIdAndUpdate(homePageDoc[0]._id, {path : req.file.path}, {runValidators: true});
    return res.send(req.file.path)
});

homePageRouter.get("/homeImage", async (req,res) => {
    let homePageDoc2 = await homePage.find();
    res.sendFile(path.resolve(__dirname, "../" + homePageDoc2[0].path));
});

export {
    homePageRouter
};