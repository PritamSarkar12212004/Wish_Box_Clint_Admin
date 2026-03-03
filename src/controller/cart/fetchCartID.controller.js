import mongoose from "mongoose";
import service from "../../model/service.js";

const fetchCartID = async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        message: "Invalid User ID",
      });
    }

    // Find cart of user
    const cart = await service.clint.cart.findOne({ user: userId });

    if (!cart || cart.items.length === 0) {
      return res.status(200).json({
        success: true,
        productIds: [],
      });
    }

    // Extract only product IDs
    const productIds = cart.items.map((item) => item.product.toString());

    res.status(200).json({
      success: true,
      productIds,
    });
  } catch (error) {
    console.error("Fetch Cart IDs Error:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default fetchCartID;
