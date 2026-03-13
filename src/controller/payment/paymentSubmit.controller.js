import service from "../../model/service.js";

const paymentSubmit = async (req, res) => {
  try {
    const { orderID, utrValue, userInfor, userId } = req.body;
    if (!orderID || !utrValue) {
      return res.status(400).json({
        success: false,
        message: "OrderID and UTR required",
      });
    }

    const order = await service.order
      .findOne({ orderId: orderID })
      .catch((err) => {
        console.log(err);
      });

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    if (order.payment.paymentStatus !== "waiting_payment") {
      return res.status(400).json({
        success: false,
        message: "Payment already submitted",
      });
    }

    // update payment info
    order.payment.utr = utrValue;
    order.payment.paymentStatus = "pending_verification";
    order.payment.paidAt = new Date();
    order.orderStatus = "payment_verification";

    await order.save();

    // update user address
    if (userInfor && userId) {
      const user = await service.clint.clint.findById(userId);

      if (user) {
        user.name = userInfor.fullName;

        user.addresses.push({
          addressLine1: userInfor.addressLine,
          city: userInfor.city,
          district: userInfor.district,
          state: userInfor.state,
          pincode: userInfor.pincode,
          isDefault: true,
        });

        await user.save();
      }
    }

    res.status(200).json({
      success: true,
      orderId: order.orderId,
      orderStatus: order.orderStatus,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

export default paymentSubmit;
