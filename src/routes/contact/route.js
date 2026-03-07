import express from "express";
import routeHandler from "express-async-handler";
import routePath from "../../const/routePath.js";
import fullContact from "../../controller/contact/fullContact.controller.js";
const route = express.Router();

route.post(routePath.WISHBOX.CONTACT.FULL_CONTACT, routeHandler(fullContact));

export default route;
