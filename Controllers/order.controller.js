import Order from "../Models/order.model.js";

export const createNewOrder = async (req, res) => {
  const { address, name, orderTotal, cartItems, userId } = req.body;

  try {
    const newOrder = await Order.create({
      address,
      name,
      orderTotal,
      cartItems,
      user: userId.toString(),
    });

    return res
      .status(201)
      .json({
        success: true,
        message: "New order created successfully !",
        newOrder,
      });
  } catch (err) {
    return res
      .status(400)
      .json({ success: false, message: "Error while creating new order", err });
  }
};

export const getAllOrders = async (req, res) => {
  const userId = req.userId;
  try {
    const userOrders = await Order.find({
      user: userId,
    });

    return res
      .status(200)
      .json({
        success: true,
        message: `Found all orders for userId ${userId}`,
        userOrders,
      });
  } catch (err) {
   return res
      .status(400)
      .json({ success: false, message: "Error fetching orders", err });
  }
};
