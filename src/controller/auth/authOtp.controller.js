import api from "../../services/axios/api.js";
import service from "../../model/service.js";

const authOtp = async (req, res) => {
  const { phone } = req.body;

  try {
    let user = await service.clint.clint.findOne({
      whatsappNumber: phone,
    });

    let isNewUser = false;

    if (!user) {
      isNewUser = true;
      user = await service.clint.clint.create({
        whatsappNumber: phone,
      });
    }

    const response = await api.post("/api/whatsapp/otp/wishbox", {
      number: phone,
      otp: "123456",
      type: "Login",
    });

    return res.status(200).json({
      success: true,
      message: isNewUser
        ? "New user created & OTP sent"
        : "Existing user - OTP sent",
      otpData: response.data,
      user: user,
      userId: user._id,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export default authOtp;
