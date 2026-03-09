import ProductModal from "./product/ProductModal.js";
import GalleryImageModal from "./product/GalleryImageModal.js";
import CollectionModal from "./product/CollectionModal.js";
import OrderModal from "./odars/OrderModal.js";
import ClientCartModal from "./client/ClientCartModal.js";
import ClientModal from "./client/ClientModal.js";
import ClientWatchListModal from "./client/ClientWatchListModal.js";
import contactFullModel from "./contact/contactFullModel.js";
import paymentDetilesModal from "./paymentDetiles/paymentDetilesModal.js";
const service = {
  product: ProductModal,
  gallery: GalleryImageModal,
  collection: CollectionModal,
  order: OrderModal,
  clint: {
    cart: ClientCartModal,
    clint: ClientModal,
    watchList: ClientWatchListModal,
  },
  contact: {
    fullContact: contactFullModel,
  },
  payment: {
    admin_payment_info: paymentDetilesModal,
  },
};
export default service;
