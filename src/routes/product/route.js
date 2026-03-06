import express from "express";
import routeHandler from "express-async-handler";
import routePath from "../../const/routePath.js";

import fetchProductImage from "../../controller/product/fetchProductImage.controller.js";
import addToCart from "../../controller/cart/addToCart.controller.js";
import fetchCartID from "../../controller/cart/fetchCartID.controller.js";
import fetchFullCart from "../../controller/cart/fetchFullCart.controller.js";
import updateCart from "../../controller/cart/updateCart.controller.js";
import removeSingleCartItem from "../../controller/cart/removeSingleCartItem.controller.js";
import addWatchList from "../../controller/watchlist/addWatchList.controller.js";
import fetchWatchListStatus from "../../controller/watchlist/fetchWatchListStatus.controller.js";
import fetchWatchListFullData from "../../controller/watchlist/fetchWatchListFullData.controller.js";
import fetchFullProduct from "../../controller/product/fetchFullProduct.controller.js";

const route = express.Router();

route.post(
  routePath.WISHBOX.PRODUCT.FETCH_FULL_PRODUCT,
  routeHandler(fetchFullProduct),
);
route.post(
  routePath.WISHBOX.PRODUCT.FETCH_PRODUCT_IMAGE,
  routeHandler(fetchProductImage),
);

route.post(routePath.WISHBOX.PRODUCT.CART.ADD_CART, routeHandler(addToCart));

route.post(
  routePath.WISHBOX.PRODUCT.CART.FETCH_ID_CART,
  routeHandler(fetchCartID),
);

route.post(
  routePath.WISHBOX.PRODUCT.CART.FETCH_FULL_CART,
  routeHandler(fetchFullCart),
);

route.post(
  routePath.WISHBOX.PRODUCT.CART.UPDATE_CART,
  routeHandler(updateCart),
);

route.post(
  routePath.WISHBOX.PRODUCT.CART.REMOVE_SINGLE_CART_ITEM,
  routeHandler(removeSingleCartItem),
);

route.post(
  routePath.WISHBOX.PRODUCT.WATCHLIST.ADD_WATCH_LIST,
  routeHandler(addWatchList),
);
route.post(
  routePath.WISHBOX.PRODUCT.WATCHLIST.FETCH_WATCH_LIST,
  routeHandler(fetchWatchListStatus),
);
route.post(
  routePath.WISHBOX.PRODUCT.WATCHLIST.FETCH_FULL_WATCH_LIST,
  routeHandler(fetchWatchListFullData),
);

export default route;
