const routePath = {
  WISHBOX: {
    DASHBOARD: {
      ROOT: "/dashboard",
      FETCH_DATA: "/fetch_Dashboard_data",
    },
    GALLERY: {
      ROOT: "/gallery",
      FETCH_GALLERY_DATA: "/fetch_Gallery_data",
    },
    PRODUCT: {
      ROOT: "/product",
      FETCH_PRODUCT_IMAGE: "/fetch_product_image",
      CART: {
        ADD_CART: "/product_add_cart",
        FETCH_ID_CART: "/product_fetch_id_cart",
      },
    },
    AUTH: {
      ROOT: "/auth",
      OTP_CALL: "/call_otp",
    },
  },
};
export default routePath;
