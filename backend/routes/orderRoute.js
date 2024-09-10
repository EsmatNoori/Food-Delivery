import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  placeOrder,
  userOrder,
  verifyOrder,
  listOrders,
} from "../controllers/orderController.js";

//using this express we will create the router
const orderRouter = express.Router();

//endpoints
orderRouter.post("/place", authMiddleware, placeOrder);
orderRouter.post("/verify", verifyOrder);
orderRouter.post("/userorders", authMiddleware, userOrder);
orderRouter.get("/list", listOrders);
export default orderRouter;
