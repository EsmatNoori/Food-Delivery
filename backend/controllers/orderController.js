import { CurrencyCodes } from "validator/lib/isISO4217.js";
import Order from "../models/orderModel.js";
import userModel from "../Models/userModel.js";
import { model } from "mongoose";

export const placeOrder = async (req, res) => {
  const frontend_url = "http://localhost/5173";
  try {
    const newOrder = new OrderModel({
      userId: req.body.userId,
      items: req.body.items,
      amount: req.body.amount,
      address: req.body.address,
      paymentMethod: req.body.paymentMethod,
      isCashPayment: req.body.paymentMethod === "cash",
      status: "Pending",
    });
    await newOrder.save();
    await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });
    const line_items = req.body.items.map((item) => ({
      priceData: {
        Currency: "Afg",
        product_data: {
          name: item.name,
        },
        // unit_amount:item.price*100
      },
      quantity: item.quantity,
    }));

    line_items.push({
      priceData: {
        Currency: "Afg",
        product_data: {
          name: "Delivery Charges",
        },
        // unit_amount:2*100*80
      },
      quantity: 1,
    });
    const session = await Stripe.Checkout.sessions.create({
      line_items: line_items,
      mode: "payment",
      success_url: `${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
      cancel_url: `${frontend_url}/verify?success=false&orderId=${newOrder._id}`,
    });
    res.json({ success: true, session_url: session.url });
  } catch (error) {
    res.json({ success: false, message: "Error placing order" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findById(orderId);
    order.status = status;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const verifyOrder = async (req, res) => {
  try {
    const { orderId } = req.body; //
    const order = await Order.findById(orderId);

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    if (order.status === "Delivered") {
      return res
        .status(200)
        .json({ success: true, message: "Order is already delivered!" });
    }

    res.status(200).json({ success: true, message: "Order is valid", order });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error verifying order",
      error: error.message,
    });
  }
};
// user order from frontend
export const userOrder = async (req, res) => {
  try {
    const orders = await orderModel.find({ userId: req.body.userId });
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

//listing orders for admin panel
export const listOrders = async (req, res) => {
  try {
    const orders = await orderModel.find({});
    res.json({ success: true, data: orders });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

// import Order from "../models/orderModel.js";
// import userModel from "../models/userModel.js";

// export const userOrder = async (req, res) => {
//   try {
//     const orders = await orderModel.find({ userId: req.body.userId });
//     res.json({ success: true, data: orders });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Error" });
//   }
// };

// export const listOrders = async (req, res) => {
//   try {
//     const orders = await Order.find();
//     res.status(200).json(orders);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const placeOrder = async (req, res) => {
//   try {
//     const newOrder = new Order({
//       userId: req.body.userId,
//       items: req.body.items,
//       amount: req.body.amount,
//       address: req.body.address,
//       paymentMethod: req.body.paymentMethod,
//       isCashPayment: req.body.paymentMethod === "cash",
//       status: "Pending",
//     });

//     await newOrder.save();

//     await userModel.findByIdAndUpdate(req.body.userId, { cartData: {} });

//     res.json({ success: true });
//   } catch (error) {
//     console.error("Error placing order:", error.message);
//     res.status(500).json({
//       success: false,
//       message: "Error placing order",
//       error: error.message,
//     });
//   }
// };

// export const updateOrderStatus = async (req, res) => {
//   try {
//     const { orderId, status } = req.body;
//     const order = await Order.findById(orderId);
//     order.status = status;
//     await order.save();
//     res.status(200).json(order);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// };

// export const verifyOrder = async (req, res) => {
//   try {
//     const { orderId } = req.body;
//     const order = await Order.findById(orderId);

//     if (!order) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Order not found" });
//     }

//     if (order.status === "Delivered") {
//       return res
//         .status(200)
//         .json({ success: true, message: "Order is already delivered!" });
//     }

//     res.status(200).json({ success: true, message: "Order is valid", order });
//   } catch (error) {
//     res.status(500).json({
//       success: false,
//       message: "Error verifying order",
//       error: error.message,
//     });
//   }
// };
