import mongoose from "mongoose";
import service from "../../model/service.js";

const fetchProductImage = async (req, res) => {
  try {
    const galleryIds = req.body;
    if (!Array.isArray(galleryIds) || galleryIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Gallery IDs are required",
      });
    }
    const objectIds = galleryIds.map((id) => new mongoose.Types.ObjectId(id));
    const galleryImages = await service.gallery
      .find({
        _id: { $in: objectIds },
      })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: galleryImages.length,
      data: galleryImages,
    });
  } catch (error) {
    console.error("Fetch Product Gallery Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch product gallery images",
      error: error.message,
    });
  }
};

export default fetchProductImage;
