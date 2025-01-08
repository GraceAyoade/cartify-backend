import express from "express";
import cors from "cors";
import authRouter from "../routes/auth.routes";
import productRouter from "../routes/products.routes";

// creating express app
const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true, limit: "50mb" }));

// api endpoints
app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);

export default app;
