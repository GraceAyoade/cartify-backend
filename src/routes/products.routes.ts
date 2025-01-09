import express from "express";
import {
  addProduct,
  listProducts,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller";
import upload from "../middleware/multer";
import {adminAuth} from "../middleware/auth.mw";

const productRouter = express.Router();

productRouter.post(
  "/add", adminAuth,
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);
productRouter.get("/list-products", listProducts);
productRouter.post("/remove", adminAuth, removeProduct);
productRouter.post("/single-info", singleProduct);

export default productRouter;
