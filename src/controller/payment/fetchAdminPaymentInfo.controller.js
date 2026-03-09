import service from "../../model/service.js";

const fetchAdminPaymentInfo = async (req, res) => {
  try {
    const paymentInfo = await service.payment.admin_payment_info.findOne({
      isActive: true,
    });
    if (!paymentInfo) {
      return res.status(404).json({
        success: false,
        message: "No active payment details found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Payment details fetched successfully",
      data: paymentInfo,
    });
  } catch (error) {
    console.error("Error fetching payment info:", error);

    res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

export default fetchAdminPaymentInfo;
