import express from "express";
import routeHandler from "express-async-handler";
import routePath from "../../const/routePath.js";
import fetchAdminPaymentInfo from "../../controller/payment/fetchAdminPaymentInfo.controller.js";
const route = express.Router();

route.post(
  routePath.WISHBOX.PAYMENT.FETCH_ADMIN_PAYMENT_INFO,
  routeHandler(fetchAdminPaymentInfo),
);

export default route;
