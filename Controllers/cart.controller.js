import Cart from "../Models/cart.model.js";

export const getCartData = async (req, res) => {
  const userId = req.userId;

  try {
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId not found !" });
    }
    const cartData = await Cart.find({ user: userId }).populate(
      "products.product"
    );

    if (!cartData) {
      const newCart = await Cart.create({
        user: userId,
        products: [],
      });
      return res
        .status(200)
        .json({ success: true, message: "New Cart Created !" });
    }

    return res.status(200).json({
      success: true,
      message: "cartData found successfully !",
      cartData,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "error while fetching cart data", err });
  }
};

export const addCartItem = async (req, res) => {
  const userId = req.userId;

  const { productId, quantity } = req.body;

  try {
    const userCart = await Cart.findOne({ user: userId });

    if (!userCart) {
      const userCart = await Cart.create({
        products: [{ product: productId, quantity }],
        user: userId,
      });
      return res.status(201).json({
        success: true,
        message: `new product added to cart successfully`,
        userCart,
      });
    }

    let present = false;
    userCart.products = userCart.products.map((i) => {
      if (i.product.toString() === productId.toString()) {
        present = true;
      }
      return i;
    });

    if (present) {
      return res
        .status(200)
        .json({ success: true, message: "Item already added to cart !" });
    }

    const newProduct = { product: productId, quantity };

    if (userCart.products.length > 20)
      return res
        .status(400)
        .json({ success: false, message: "Cart is full !" });

    userCart.products.push(newProduct);

    await userCart.save();

    return res.status(200).json({
      success: true,
      message: "new item added to cart successfully !",
      userCart,
    });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "error while adding cart item ", err });
  }
};

export const removeCartItem = async (req, res) => {
  const userId = req.userId;
  const productId = req.params.id;

  try {
    const userCart = await Cart.findOneAndUpdate(
      { user: userId },
      { $pull: { products: { product: productId.toString() } } },
      { safe: true, multi: false }
    );

    return res
      .status(200)
      .json({ success: true, message: "item removed successfully", userCart });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "error while removing cart item", err });
  }
};

export const updateItemQuantity = async (req, res) => {
  const userId = req.userId;
  const { productId, quantity } = req.body;

  try {
    const userCart = await Cart.findOne({ user: userId });

    userCart.products = userCart.products.map((i) => {
      if (i.product.toString() === productId.toString()) {
        i.quantity = quantity;
      }
      return i;
    });

    await userCart.save();

    return res
      .status(200)
      .json({ success: true, message: "cart updated successfully", userCart });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "error while updating cart", err });
  }
};
