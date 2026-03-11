import express from "express";
import routeHandler from "express-async-handler";
import routePath from "../../const/routePath.js";
import fetchDetiles from "../../controller/order/fetchDetiles.controller.js";
const route = express.Router();

route.post(
  routePath.WISHBOX.ORDER.FETCH_ORDER_DETILES,
  routeHandler(fetchDetiles),
);

export default route;
