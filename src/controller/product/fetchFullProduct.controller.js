import service from "../../model/service.js";

const fetchFullProduct = async (req, res) => {
  try {
    const products = await service.product
      .find({})
      .populate("productCollection")
      .populate("gallery")
      .sort({ createdAt: -1 });

    return res.status(200).json({
      status: true,
      message: "All products fetched successfully",
      totalProducts: products.length,
      data: products,
    });
  } catch (error) {
    console.error("Fetch product error:", error);

    return res.status(500).json({
      status: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export default fetchFullProduct;
