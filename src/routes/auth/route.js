import express from "express";
const route = express.Router();

import routeHandler from "express-async-handler";
import routePath from "../../const/routePath.js";
import authOtp from "../../controller/auth/authOtp.controller.js";

route.post(routePath.WISHBOX.AUTH.OTP_CALL, routeHandler(authOtp));

export default route;
