import mongoose from "mongoose";

const paymentDetailsSchema = new mongoose.Schema(
  {
    upiId: {
      type: String,
      required: true,
    },

    qrImageUrl: {
      type: String,
      required: true,
    },

    accountName: {
      type: String,
    },

    bankName: {
      type: String,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true },
);

export default mongoose.model("PaymentDetail", paymentDetailsSchema);
