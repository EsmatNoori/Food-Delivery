import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
  userId: { type: String, required: true },
  items: { type: Array, required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },
  isCashPayment: { type: Boolean, default: false },
  status: { type: String, default: "Pending" },
  date: { type: Date, default: Date.now },
});

const Order = mongoose.models.Order || mongoose.model("Order", orderSchema);
export default Order;

// import Order from "../models/orderModel.js";

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
//     res.json({ success: true });
//   } catch (error) {
//     console.error("Error placing order:", error.message);
//     res.status(500).json({ success: false, message: "Error placing order", error: error.message });
//   }
// };
