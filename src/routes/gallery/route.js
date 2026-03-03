import express from "express";
import routeHandler from "express-async-handler";
import routePath from "../../const/routePath.js";
import galleryDataFetch from "../../controller/galerry/galleryDataFetch.controller.js";
const route = express.Router();

route.post(
  routePath.WISHBOX.GALLERY.FETCH_GALLERY_DATA,
  routeHandler(galleryDataFetch),
);

export default route;
