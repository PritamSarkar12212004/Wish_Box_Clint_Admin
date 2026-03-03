import mongoose from "mongoose";
import service from "../../model/service.js";

const addToCart = async (req, res) => {
  try {
    const { user, items } = req.body;

    // ✅ Validation
    if (!user || !items || !items.product) {
      return res.status(400).json({
        success: false,
        message: "User and product are required",
      });
    }

    if (
      !mongoose.Types.ObjectId.isValid(user) ||
      !mongoose.Types.ObjectId.isValid(items.product)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid User or Product ID",
      });
    }

    // ✅ Quantity Set
    const quantity = items.quantity && items.quantity > 0 ? items.quantity : 1;

    // ✅ Find User Cart
    let cart = await service.clint.cart.findOne({ user });

    if (!cart) {
      // Create New Cart
      cart = new service.clint.cart({
        user,
        items: [{ ...items, quantity }],
      });
    } else {
      // Check if Product Already Exists
      const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === items.product,
      );

      if (existingItemIndex > -1) {
        // Update Quantity
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        // Add New Item
        cart.items.push({ ...items, quantity });
      }
    }

    // ✅ Recalculate Total Amount
    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );

    // ✅ Save Cart
    await cart.save();

    // 🔥 Get Added / Updated Item From Cart
    const addedItem = cart.items.find(
      (item) => item.product.toString() === items.product,
    );

    // ✅ Clean Response Object
    const responseProduct = {
      _id: addedItem.product.toString(), // product id
      title: addedItem.title,
      price: addedItem.price,
      quantity: addedItem.quantity,
      image: addedItem.image,
    };

    return res.status(200).json({
      success: true,
      message: "Item added to cart successfully",
      product: responseProduct,
    });
  } catch (error) {
    console.error("Add To Cart Error:", error);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default addToCart;
