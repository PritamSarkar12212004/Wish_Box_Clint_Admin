import mongoose from "mongoose";
import service from "../../model/service.js";

const toggleWatchList = async (req, res) => {
  try {
    const { id, userID } = req.body;

    if (
      !mongoose.Types.ObjectId.isValid(id) ||
      !mongoose.Types.ObjectId.isValid(userID)
    ) {
      return res.status(400).json({
        success: false,
        message: "Invalid product or user ID",
      });
    }

    const productExists = await service.product.findById(id);
    if (!productExists) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }

    let wishlist = await service.clint.watchList.findOne({ user: userID });

    if (!wishlist) {
      wishlist = await service.clint.watchList.create({
        user: userID,
        products: [{ product: id }],
      });

      return res.status(201).json({
        success: true,
        message: "Product added to wishlist",
        isAdded: true,
      });
    }

    const existingIndex = wishlist.products.findIndex(
      (item) => item.product.toString() === id,
    );

    if (existingIndex !== -1) {
      wishlist.products.splice(existingIndex, 1);
      await wishlist.save();

      return res.status(200).json({
        success: true,
        message: "Product removed from wishlist",
        isAdded: false,
      });
    }

    wishlist.products.push({ product: id });
    await wishlist.save();

    return res.status(200).json({
      success: true,
      message: "Product added to wishlist",
      isAdded: true,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default toggleWatchList;
