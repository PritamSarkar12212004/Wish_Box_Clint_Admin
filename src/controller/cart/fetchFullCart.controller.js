import mongoose from "mongoose";
import service from "../../model/service.js";

const fetchFullCart = async (req, res) => {
  try {
    const { user } = req.body;

    // ✅ Validate User ID
    if (!user || !mongoose.Types.ObjectId.isValid(user)) {
      return res.status(400).json({
        success: false,
        message: "Valid user ID is required",
      });
    }

    // ✅ Find Cart
    const cart = await service.clint.cart.findOne({ user });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

    // ✅ Format Items Cleanly
    const formattedItems = cart.items.map((item) => ({
      _id: item.product.toString(),
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
      subTotal: item.price * item.quantity,
    }));

    return res.status(200).json({
      success: true,
      totalAmount: cart.totalAmount,
      items: formattedItems,
    });
  } catch (error) {
    console.error("Fetch Cart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default fetchFullCart;
