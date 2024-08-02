import mongoose, { Types } from "mongoose";

const cartSchema = new mongoose.Schema({
   products: [
    {
   product: {
        type: Types.ObjectId,
        ref: 'Product'
    },
    quantity: {
        type: String
    }
}
   ],
   user: {
    type: Types.ObjectId,
    ref: "User"
   },
}, {versionKey: false, timestamps: true})

const Cart = mongoose.model.Cart || mongoose.model("Cart", cartSchema);
export default Cart;