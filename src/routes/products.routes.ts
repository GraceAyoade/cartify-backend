import express from "express";
import {
  addProduct,
  addProducts,
  deleteProduct,
  productList,
  removeProduct,
  singleProduct,
} from "../controllers/product.controller";
import upload from "../middleware/multer";

const productRouter = express.Router();

productRouter.post(
  "/add",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProducts
);
productRouter.post("/add-product", addProduct);
productRouter.get("/list-products", productList);
productRouter.delete("/delete-product", deleteProduct);
productRouter.post("/remove", removeProduct);
productRouter.post("/single", singleProduct);

export default productRouter;
