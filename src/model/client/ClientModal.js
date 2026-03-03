import mongoose from "mongoose";

const addressSchema = new mongoose.Schema(
  {
    city: {
      type: String,
      required: true,
    },
    state: {
      type: String,
      required: true,
    },

    pincode: {
      type: String,
      required: true,
    },
    isDefault: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    whatsappNumber: {
      type: String,
      required: true,
    },
    addresses: [addressSchema],
  },
  { timestamps: true },
);

export default mongoose.model("User", userSchema);
