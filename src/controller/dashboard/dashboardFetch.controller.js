import service from "../../model/service.js";
const dashboardFetch = async (req, res) => {
  try {
    const topSellingProducts = await service.order.aggregate([
      { $unwind: "$items" },

      {
        $group: {
          _id: "$items.product",
          totalSold: { $sum: "$items.quantity" },
        },
      },

      { $sort: { totalSold: -1 } },
      { $limit: 8 },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product",
        },
      },

      { $unwind: "$product" },
      {
        $replaceRoot: {
          newRoot: {
            $mergeObjects: ["$product", { totalSold: "$totalSold" }],
          },
        },
      },
    ]);
    const topSellingCollections = await service.order.aggregate([
      { $unwind: "$items" },

      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "product",
        },
      },

      { $unwind: "$product" },

      {
        $group: {
          _id: "$product.productCollection",
          totalSold: { $sum: "$items.quantity" },
        },
      },

      { $sort: { totalSold: -1 } },
      { $limit: 8 },

      {
        $lookup: {
          from: "collections",
          localField: "_id",
          foreignField: "_id",
          as: "collection",
        },
      },

      { $unwind: "$collection" },

      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "productCollection",
          as: "products",
        },
      },

      {
        $project: {
          _id: "$collection._id",
          title: "$collection.title",
          subtitle: "$collection.subtitle",
          categoryName: "$collection.categoryName",
          coverImages: "$collection.coverImages",
          totalProducts: { $size: "$products" },
          totalSold: 1,
        },
      },
    ]);

    let collections = topSellingCollections;
    let products = topSellingProducts;
    if (collections.length === 0) {
      collections = await service.collection.aggregate([
        {
          $lookup: {
            from: "products",
            localField: "_id",
            foreignField: "productCollection",
            as: "products",
          },
        },
        {
          $addFields: {
            totalProducts: { $size: "$products" },
          },
        },
        { $sort: { createdAt: -1 } },
        { $limit: 8 },
      ]);
    }
    if (products.length === 0) {
      products = await service.product.find().sort({ createdAt: -1 }).limit(8);
    }

    return res.status(200).json({
      status: true,
      message: "Dashboard data fetched successfully",
      data: {
        collections,
        products,
      },
    });
  } catch (error) {
    console.error("Dashboard fetch error:", error);
    return res.status(500).json({
      status: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

export default dashboardFetch;
