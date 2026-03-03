import express from "express";
const route = express.Router();

import routeHandler from "express-async-handler";
import routePath from "../../const/routePath.js";
import dashboardFetch from "../../controller/dashboard/dashboardFetch.controller.js";

route.post(
  routePath.WISHBOX.DASHBOARD.FETCH_DATA,
  routeHandler(dashboardFetch),
);

export default route;
