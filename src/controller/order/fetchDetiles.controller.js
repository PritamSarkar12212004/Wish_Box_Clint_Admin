import service from "../../model/service.js";

const fetchDetiles = async (req, res) => {
  try {
    const { userID } = req.body;
    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User ID required",
      });
    }

    const orders = await service.order
      .find({ customer: userID })
      .populate("customer", "name email phone")
      .populate({
        path: "items.product",
      })
      .sort({ createdAt: -1 });

    if (!orders.length) {
      return res.status(404).json({
        success: false,
        message: "No orders found",
      });
    }

    res.status(200).json({
      success: true,
      totalOrders: orders.length,
      orders,
    });
  } catch (error) {
    console.error("Fetch Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default fetchDetiles;
