import { Request, Response, NextFunction } from "express";
import ErrorResponse from "../utils/errorResponse.utils";
import { v2 as cloudinary } from "cloudinary";
import Product from "../models/products.model";

// add product to cart
export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const {
      name,
      description,
      price,
      category,
      subCategory,
      sizes,
      color,
      bestseller,
      quantity,
    } = req.body;
    if (!req.files) {
      res
        .status(400)
        .json({ error: true, message: "All images are required", data: null });
    }
    const img = req.files as {
      image1: Express.Multer.File[];
      image2: Express.Multer.File[];
      image3: Express.Multer.File[];
      image4: Express.Multer.File[];
    };
    const images = [
      img.image1 && img.image1[0],
      img.image2 && img.image2[0],
      img.image3 && img.image3[0],
      img.image4 && img.image4[0],
    ].filter((item) => item !== undefined);

    let imagesUrl = await Promise.all(
      images.map(async (item) => {
        let result = await cloudinary.uploader.upload(item.path, {
          resource_type: "image",
        });
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subCategory,
      sizes: JSON.parse(sizes),
      color: JSON.parse(color),
      bestseller: bestseller === "true" ? true : false,
      quantity,
      image: imagesUrl,
      date: Date.now(),
    };

    const product = new Product(productData);
    await product.save();
    res.status(200).json({
      error: false,
      message: "Product added successfully",
      data: null,
    });
  } catch (error) {
    return next(new ErrorResponse("Internal server error!", 500));
  }
};

// list of products
export const listProducts = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const products = await Product.find({});
    res
      .status(200)
      .json({ error: false, message: "product list found!", data: products });
  } catch (error) {
    return next(new ErrorResponse("Internal server error!", 500));
  }
};

// remove product in cart
export const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    await Product.findByIdAndDelete(req.body.id);
    res.status(200).json({
      error: false,
      message: "product removed successfully!",
      data: null,
    });
  } catch (error) {
    return next(new ErrorResponse("Internal server error!", 500));
  }
};

//function for single product info
export const singleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.body;
    const product = await Product.findById(id);
    res
      .status(200)
      .json({ error: false, message: "product info found", data: product });
  } catch (error) {
    return next(new ErrorResponse("product info not found!", 404));
  }
};

