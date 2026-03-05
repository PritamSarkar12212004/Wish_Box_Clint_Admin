import services from "../../model/service.js";
import mongoose from "mongoose";

const fetchWatchListFullData = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Valid userId is required",
      });
    }

    const wishlist = await services.clint.watchList
      .findOne({ user: userId })
      .populate({
        path: "products.product",
        match: { isActive: true, status: "active" },
      });

    if (!wishlist) {
      return res.status(200).json({
        success: true,
        data: [],
      });
    }

    const fullProducts = wishlist.products
      .filter((item) => item.product !== null)
      .map((item) => item.product);

    return res.status(200).json({
      success: true,
      data: fullProducts,
    });
  } catch (error) { 
    console.log("Fetch Wishlist Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default fetchWatchListFullData;
