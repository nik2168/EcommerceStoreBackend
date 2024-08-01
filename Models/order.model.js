import mongoose from "mongoose";

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
      type: String,
      required: true,
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
