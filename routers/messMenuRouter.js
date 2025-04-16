import express from "express";
import multer from "multer";
import { verifyUserRequest } from "../middlewares/user.auth.js";
import * as Controller from "../controllers/messMenuController.js";

const messMenuRouter = express.Router();

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, new URL("../files_folder/", import.meta.url).pathname);
    },
    filename: (req, file, cb) => {
        console.log(file);
        let parts = file.originalname.split(".");
        let fileExtension = parts[parts.length - 1];
        cb(null, "file." + fileExtension);
    }
});

const upload = multer({ storage: fileStorageEngine });

messMenuRouter.get("/hostelsMessMenu", verifyUserRequest, Controller.getAllMenuItems);
messMenuRouter.post("/createMessMenu", verifyUserRequest, upload.single("file"), Controller.createMessMenu);

export { messMenuRouter };