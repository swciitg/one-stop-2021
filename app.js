import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import routers from './routers/index.js';
import LastUpdate from './models/lastUpdate.js';
import { BASEURL, ADMINPANELROOT } from './helpers/constants.js';
import { adminJsRouter } from './admin_panel/admin-config.js';
import bcrypt from 'bcrypt';
import { errorHandler } from './middlewares/error.handler.js';
import { NotFoundError } from './errors/not.found.error.js';
import { createLastUpdateDocument } from './controllers/lastUpdateController.js';
import { UnauthorizedRequestError } from './errors/unauthorized.request.error.js';
import { scheduleOPIEmails } from './helpers/cronJobs/opiEmails.js';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

// Setup __dirname equivalent for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config();

const app = express();

console.log(bcrypt.hashSync("123",10));
//for serving static files
app.use(express.static("public"));

// connect to mongodb
mongoose.set("strictQuery", false);

app.use(
    express.json({
        limit: "50mb",
        extended: true,
    })
);

console.log(BASEURL,ADMINPANELROOT);

// adminjs routes
app.use(ADMINPANELROOT, adminJsRouter);
app.use(BASEURL, routers.homePageRouter);

// setting ejs as view engine
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));

app.use(BASEURL, routers.messmenuUploadRouter);


// enable CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization, Security-Key"
    );
    next();
});


// Gatelog Endpoint for fetching user details with roll number Secure GET by rollNo (HMAC auth + AES-GCM encrypt response)
app.use(BASEURL, routers.gatelogRouter);


// docs route
app.use(BASEURL, routers.docsRouter);

app.use(BASEURL, routers.authRouter);
app.use(BASEURL, routers.imageRouter);

// Validate API Call
app.use((req, res, next) => {
    console.log(req.path);
    if (req.headers["security-key"] !== process.env.SECURITY_KEY) {
        next(new UnauthorizedRequestError("You are not authorized app.js"));
    }
    next();
});

app.use(BASEURL, routers.notificationRouter);

// API routers
app.use(BASEURL, routers.onestopUserRouter);
app.use(BASEURL, routers.contactRouter);
app.use(BASEURL, routers.timingRouter);
app.use(BASEURL, routers.emailRouter);
app.use(BASEURL, routers.roleRouter);
app.use(BASEURL, routers.foodOutletsRouter);
app.use(BASEURL, routers.foodItemsRouter);
app.use(BASEURL, routers.messMenuRouter);
app.use(BASEURL, routers.LostAndFoundRouters);
app.use(BASEURL, routers.updateRouter);
app.use(BASEURL, routers.buyAndSellRouter);
app.use(BASEURL, routers.newsRouter);
app.use(BASEURL, routers.campusTravelRouter);
app.use(BASEURL, routers.upspRouter);
app.use(BASEURL, routers.hospitalFeedbackRouter);
app.use(BASEURL, routers.hospitalContactRouter);
app.use(BASEURL, routers.hospitalTimetableRouter);
app.use(BASEURL, routers.habComplaintRouter);
app.use(BASEURL, routers.gcScoreboardRouter);
app.use(BASEURL, routers.opiRouter);


console.log("Admin Panel running at", ADMINPANELROOT);

app.use((req, res, next) => {
    next(new NotFoundError(`The requested path ${req.path} was not found.`));
});

app.use(errorHandler);

// schedule cron jobs
try {
    scheduleOPIEmails();
}
catch (e) {
    console.log("Error in scheduling OPI emails", e);
}

const PORT = process.env.PORT || 3000;
app.listen(PORT, async () => {
    console.log(`\nExpress server listening on port ${PORT} see docs at /docs\n`);
    await mongoose.connect(process.env.DATABASE_URI);
    console.log("Connected to MongoDB");
    await createLastUpdateDocument();
});
