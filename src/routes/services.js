import dashboard from "./dashboard/route.js";
import gallery from "./gallery/route.js";
import product from "./product/route.js";
import auth from "./auth/route.js";
import contact from "./contact/route.js";
import payment from "./payment/route.js";
const services = {
  dashboard: dashboard,
  gallery: gallery,
  product: product,
  auth: auth,
  contact: contact,
  payment: payment,
};
export default services;
