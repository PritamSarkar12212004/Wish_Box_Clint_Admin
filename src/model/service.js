import ProductModal from "./product/ProductModal.js";
import GalleryImageModal from "./product/GalleryImageModal.js";
import CollectionModal from "./product/CollectionModal.js";
import OrderModal from "./odars/OrderModal.js";
import ClientCartModal from "./client/ClientCartModal.js";
import ClientModal from "./client/ClientModal.js";
import ClientWatchListModal from "./client/ClientWatchListModal.js";

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
};
export default service;
