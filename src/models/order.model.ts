import mongoose from "mongoose";
import { IOrder } from "../types/types";

const OrdersSchema = new mongoose.Schema<IOrder>({
  userId: { type: String, required: true },
  Items: { type: Array, required: true },
  amount: { type: Number, required: true },
  address: { type: Object, required: true },
  status: { type: String, required: true, default: "Order Placed" },
  paymentMethod: { type: String, required: true },
  payment: { type: Boolean, required: true, default: false },
  date: { type: Number, required: true },
});

const Order = mongoose.model<IOrder>("Order", OrdersSchema);
export default Order;
