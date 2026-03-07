import service from "../../model/service.js";

const fetchFullCollection = async (req, res) => {
  try {
    console.log("🚀 Fetch Full Collection API Called");

    // fetch all collections
    const collections = await service.collection.find().lean();

    console.log("📦 Collections Found:", collections.length);

    const fullData = await Promise.all(
      collections.map(async (collection) => {
        console.log("Processing:", collection.title);

        const products = await service.product
          .find({
            productCollection: collection._id,
            isActive: true,
            status: "active",
          })
          .lean();

        console.log("Products Found:", products.length);

        return {
          ...collection,
          products,
        };
      }),
    );

    res.status(200).json({
      success: true,
      totalCollections: fullData.length,
      data: fullData,
    });
  } catch (error) {
    console.error("❌ Fetch Collection Error:", error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export default fetchFullCollection;
