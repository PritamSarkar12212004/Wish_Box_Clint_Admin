import service from "../../model/service.js";

const cancelOrder = async (req, res) => {
  try {
    const { userId, orderId } = req.body;
    if (!userId || !orderId) {
      return res.status(400).json({
        success: false,
        message: "userId and orderId required",
      });
    }

    const order = await service.order.findOne({
      _id: orderId,
      customer: userId,
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.orderStatus === "cancelled") {
      return res.status(400).json({
        success: false,
        message: "Order already cancelled",
      });
    }

    if (order.orderStatus === "delivered") {
      return res.status(400).json({
        success: false,
        message: "Delivered order cannot be cancelled",
      });
    }
    order.orderStatus = "cancelled";
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order cancelled successfully",
      order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default cancelOrder;
