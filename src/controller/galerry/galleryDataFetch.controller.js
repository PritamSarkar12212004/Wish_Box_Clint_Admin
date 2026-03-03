import service from "../../model/service.js";

const galleryDataFetch = async (req, res) => {
  try {
    const galleryImages = await service.gallery.find().sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      count: galleryImages.length,
      data: galleryImages,
    });
  } catch (error) {
    console.error("Gallery Fetch Error:", error);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch gallery images",
      error: error.message,
    });
  }
};

export default galleryDataFetch;
