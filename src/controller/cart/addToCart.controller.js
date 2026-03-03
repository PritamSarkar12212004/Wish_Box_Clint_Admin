import mongoose from "mongoose";
import service from "../../model/service.js";

const addToCart = async (req, res) => {
  try {
    const { user, items } = req.body;
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
    const quantity = items.quantity && items.quantity > 0 ? items.quantity : 1;
    let cart = await service.clint.cart.findOne({ user });

    if (!cart) {
      cart = new service.clint.cart({
        user,
        items: [{ ...items, quantity }],
      });
    } else {
      const existingItemIndex = cart.items.findIndex(
        (item) => item.product.toString() === items.product,
      );
      if (existingItemIndex > -1) {
        cart.items[existingItemIndex].quantity += quantity;
      } else {
        cart.items.push({ ...items, quantity });
      }
    }
    cart.totalAmount = cart.items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    );
    await cart.save();
    const addedItem = cart.items.find(
      (item) => item.product.toString() === items.product,
    );
    const responseProduct = {
      _id: addedItem.product.toString(),
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
