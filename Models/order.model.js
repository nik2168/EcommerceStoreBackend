import mongoose, { Types } from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },

    name: {
      type: String,
      required: true,
    },

    orderTotal: {
      type: Number,
      required: true,
    },

    user: {
      type: Types.ObjectId,
      ref: "User",
    },

    cartItems: [
      {
        type: Types.ObjectId,
        ref: "Product",
      },
    ],
  },

  { timestamps: true, versionKey: false }
);

const Order = mongoose.model.Order || mongoose.model("Order", orderSchema);
export default Order;
