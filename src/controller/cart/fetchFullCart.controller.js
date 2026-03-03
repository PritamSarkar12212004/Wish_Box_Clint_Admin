import mongoose from "mongoose";
import service from "../../model/service.js";

const fetchFullCart = async (req, res) => {
  try {
    const { id } = req.body;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: "Valid User ID is required",
      });
    }

    // ✅ Correct field
    const cart = await service.clint.cart.findOne({ user: id });

    if (!cart) {
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }

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
