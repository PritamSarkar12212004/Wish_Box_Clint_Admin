import service from "../../model/service.js";

const fetchOrderByORderID = async (req, res) => {
  try {
    const { orderID } = req.body;

    if (!orderID || typeof orderID !== "string") {
      return res.status(400).json({
        success: false,
        message: "Valid Order ID required",
      });
    }
    const order = await service.order
      .findOne({ orderId: orderID })
      .populate({
        path: "customer",
        select: "name email phone",
      })
      .populate({
        path: "items.product",
      })
      .lean();
    if (!order) {
      console.log("Order Not Found:", orderID);

      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Order fetched successfully",
      data: order,
    });
  } catch (error) {
    console.error("Fetch Order Error:", error);

    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export default fetchOrderByORderID;
