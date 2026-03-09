import mongoose from "mongoose";

const orderItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
    },
    title: String,
    price: Number,
    quantity: Number,
    image: String,
  },
  { _id: false },
);

const orderAddressSchema = new mongoose.Schema(
  {
    fullName: String,
    phone: String,
    addressLine1: String,
    addressLine2: String,
    city: String,
    state: String,
    pincode: String,
    country: {
      type: String,
      default: "India",
    },
  },
  { _id: false },
);

const paymentSchema = new mongoose.Schema(
  {
    paymentType: {
      type: String,
      enum: ["cod", "upi"],
      required: true,
    },

    utr: {
      type: String,
      default: null,
    },

    paymentStatus: {
      type: String,
      enum: ["waiting_payment", "pending_verification", "paid", "failed"],
      default: "waiting_payment",
    },

    paidAt: Date,
  },
  { _id: false },
);

const orderSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      unique: true,
    },

    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    items: [orderItemSchema],

    shippingAddress: orderAddressSchema,

    totalAmount: {
      type: Number,
      required: true,
    },

    cartProcessed: {
      type: Boolean,
      default: false,
    },

    payment: paymentSchema,

    orderStatus: {
      type: String,
      enum: [
        "checkout_initiated",
        "payment_pending",
        "payment_verification",
        "order_placed",
        "confirmed",
        "shipped",
        "delivered",
        "cancelled",
      ],
      default: "checkout_initiated",
    },
  },
  { timestamps: true },
);

export default mongoose.model("Order", orderSchema);
