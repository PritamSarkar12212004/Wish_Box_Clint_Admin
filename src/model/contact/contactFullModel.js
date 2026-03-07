import mongoose from "mongoose";

const contactFullSchema = new mongoose.Schema(
  {
    supportType: {
      type: String,
      required: true,
      trim: true,
    },

    supportName: {
      type: String,
      required: true,
      trim: true,
    },

    supportEmail: {
      type: String,
      required: true,
      trim: true,
    },

    supportPhoneNumber: {
      type: String,
      required: true,
      trim: true,
    },

    supportSubject: {
      type: String,
      required: true,
      trim: true,
    },

    supportMessage: {
      type: String,
      required: true,
    },

    status: {
      type: String,
      enum: ["pending", "resolved"],
      default: "pending",
    },

    resolvedAt: {
      type: Date,
      default: null,
      index: { expires: "1h" },
    },
  },
  {
    timestamps: true,
  },
);

export default mongoose.model("contactFull", contactFullSchema);
