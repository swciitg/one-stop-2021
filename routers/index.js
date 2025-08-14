// Convenient wrapper around all controllers

import {emailRouter} from "./emailRouter.js";
import {contactRouter} from "./contactRouter.js";
import timingRouter from "./timingRouter.js";
import authRouter from "./authRouter.js";
import {roleRouter} from "./roleRouter.js";
import {foodItemsRouter} from "./foodItemsRouter.js";
import {foodOutletsRouter} from "./foodOutletsRouter.js";
import LostAndFoundRouters from "./lostAndFoundRouter.js";
import {messMenuRouter} from "./messMenuRouter.js";
import {updateRouter} from "./updateRouter.js";
import {buyAndSellRouter} from "./buyAndSellRouter.js";
import {imageRouter} from "./imageRouter.js";
import {newsRouter} from "./newsRouter.js";
import {campusTravelRouter} from "./campusTravel.js";
import onestopUserRouter from "./onsetopUser.routes.js";
import notificationRouter from "./notification.routes.js";
import {gcScoreboardRouter} from "./gcScoreboardRouter.js";
import upspRouter from "./upspRouter.js";
import hospitalFeedbackRouter from "./hospitalFeedbackRouter.js";
import hospitalContactRouter from "./hospitalContactsRouter.js";
import hospitalTimetableRouter from "./hospitalTimetableRouter.js";
import habComplaintRouter from "./habComplaintRouter.js";
import {homePageRouter} from "./homePageRouter.js";
import {docsRouter} from "./docsRouter.js";
import {opiRouter} from "./habRoutes/opiRouter.js";
import messmenuUploadRouter from "./messmenuUploadRouter.js";
import gatelogRouter from "./gatelogRouter.js";
export default {
  emailRouter,
  contactRouter,
  timingRouter,
  authRouter,
  roleRouter,
  foodItemsRouter,
  foodOutletsRouter,
  LostAndFoundRouters,
  messMenuRouter,
  updateRouter,
  buyAndSellRouter,
  imageRouter,
  newsRouter,
  campusTravelRouter,
  onestopUserRouter,
  notificationRouter,
  gcScoreboardRouter,
  upspRouter,
  hospitalFeedbackRouter,
  hospitalContactRouter,
  hospitalTimetableRouter,
  habComplaintRouter,
  homePageRouter,
  docsRouter,
  opiRouter,
  messmenuUploadRouter,
  gatelogRouter
};
