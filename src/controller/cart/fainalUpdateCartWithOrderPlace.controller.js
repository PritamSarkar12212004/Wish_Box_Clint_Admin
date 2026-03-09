import service from "../../model/service.js";

const fainalUpdateCartWithOrderPlace = async (req, res) => {
  try {
    const { data, userID } = req.body;
    if (!data || data.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Cart data is empty",
      });
    }

    if (!userID) {
      return res.status(400).json({
        success: false,
        message: "User ID is required",
      });
    }

    const items = data.map((item) => ({
      product: item._id,
      title: item.title,
      price: item.price,
      quantity: item.quantity,
      image: item.image,
    }));

    const totalAmount = data.reduce(
      (sum, item) => sum + item.price * item.quantity,
      0,
    );

    const orderId = `WB${Date.now()}${Math.floor(Math.random() * 1000)}`;

    const order = await service.order.create({
      orderId,
      customer: userID,
      items,
      totalAmount,
      cartProcessed: true,
      orderStatus: "payment_pending",
      payment: {
        paymentType: "upi",
        paymentStatus: "waiting_payment",
      },
    });

    await service.clint.cart.findOneAndUpdate(
      { user: userID },
      {
        items: [],
        totalAmount: 0,
      },
    );

    res.status(200).json({
      success: true,
      message: "Order created, cart cleared. Awaiting payment.",
      orderId: order.orderId,
    });
  } catch (error) {
    console.error("Checkout error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default fainalUpdateCartWithOrderPlace;
