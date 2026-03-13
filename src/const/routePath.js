const routePath = {
  WISHBOX: {
    DASHBOARD: {
      ROOT: "/dashboard",
      FETCH_DATA: "/fetch_Dashboard_data",
    },
    CONTACT: {
      ROOT: "/contact",
      FULL_CONTACT: "/full_contact",
    },
    GALLERY: {
      ROOT: "/gallery",
      FETCH_GALLERY_DATA: "/fetch_Gallery_data",
    },
    ORDER: {
      ROOT: "/order",
      FETCH_ORDER_DETILES: "/fetch_order_detiles",
      CANCEL_ORDER: "/cancel_order",
    },
    PAYMENT: {
      ROOT: "/payment",
      FETCH_ADMIN_PAYMENT_INFO: "/fetch_admin_payment_info",
      PAYMENT_SUBMIT: "/submit_payment",
    },
    PRODUCT: {
      ROOT: "/product",
      FETCH_PRODUCT_IMAGE: "/fetch_product_image",
      FETCH_FULL_PRODUCT: "/fetch_full_products",
      COLLECTION: {
        FETCH_FULL_COLLECTION: "/fetch_full_collection",
      },
      CART: {
        ADD_CART: "/product_add_cart",
        FETCH_FULL_CART: "/product_fetch_full_cart",
        FETCH_ID_CART: "/product_fetch_id_cart",
        UPDATE_CART: "/product_update_cart",
        REMOVE_SINGLE_CART_ITEM: "/product_remove_single_cart",
        FAINAL_UPDATECART_WITH_CREATE_ORDER:
          "/product_cart_fainal_update_order_place",
      },
      WATCHLIST: {
        ADD_WATCH_LIST: "/product_add_watch_list",
        FETCH_WATCH_LIST: "/product_fetch_watch_list",
        FETCH_FULL_WATCH_LIST: "/product_fetch_full_watch_list",
      },
    },
    AUTH: {
      ROOT: "/auth",
      OTP_CALL: "/call_otp",
    },
  },
};
export default routePath;
