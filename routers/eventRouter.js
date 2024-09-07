const express = require("express");
const { routes } = require('../routes');
const { verifyUserRequest } = require("../middlewares/user.auth");
const {validateEventPOR} = require("../middlewares/validate.eventPOR");
const EventControllers = require("../controllers/eventControllers");
const EventRouter = express.Router();

EventRouter.get("/events",verifyUserRequest, EventControllers.getEvents);

EventRouter.get("/events/:id",verifyUserRequest, EventControllers.getEventById);

EventRouter.post("/events",verifyUserRequest,validateEventPOR, EventControllers.postEvent);

EventRouter.put("/events/:id",verifyUserRequest,validateEventPOR, EventControllers.updateEvent);

EventRouter.delete("/events/:id",verifyUserRequest,validateEventPOR, EventControllers.deleteEvent);

module.exports = { EventRouter: EventRouter };