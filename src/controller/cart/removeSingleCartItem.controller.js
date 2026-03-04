import mongoose from "mongoose";
import services from "../../model/service.js";

const removeSingleCartItem = async (req, res) => {
  try {
    const { userId, item } = req.body;
    if (
      !userId ||
      !item ||
      !mongoose.Types.ObjectId.isValid(userId) ||
      !mongoose.Types.ObjectId.isValid(item)
    ) {
      return res.status(400).json({
        success: false,
        message: "Valid userId and product id required",
      });
    }
    const cart = await services.clint.cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    cart.items = cart.items.filter(
      (cartItem) => cartItem.product.toString() !== item,
    );
    cart.totalAmount = cart.items.reduce(
      (sum, cartItem) => sum + cartItem.price * cartItem.quantity,
      0,
    );
    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Item removed successfully",
      cart,
    });
  } catch (error) {
    console.error("Remove Cart Item Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default removeSingleCartItem;
