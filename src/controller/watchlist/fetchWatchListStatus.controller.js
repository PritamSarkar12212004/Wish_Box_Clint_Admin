import mongoose from "mongoose";
import service from "../../model/service.js";

const fetchWishlistIds = async (req, res) => {
  try {
    const { userID } = req.body;

    if (!mongoose.Types.ObjectId.isValid(userID)) {
      return res.status(400).json({
        success: false,
        message: "Invalid user ID",
      });
    }

    const wishlist = await service.clint.watchList
      .findOne({ user: userID })
      .select("products.product -_id");

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const productIds = wishlist.products.map((item) => item.product.toString());

    res.status(200).json({
      success: true,
      data: productIds,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default fetchWishlistIds;
