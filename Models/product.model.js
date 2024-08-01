import mongoose, { Types } from "mongoose";

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },

    company: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      required: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    category: {
      type: Types.ObjectId,
      ref: "Category",
    },

    image: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    shipping: {
      type: Boolean,
      default: true,
    },

    colors: [
      {
        type: String,
        required: true,
      },
    ],
  },

  { timestamps: true, versionKey: false }
);

const Product =
  mongoose.model.Product || mongoose.model("Product", productSchema);
export default Product;
