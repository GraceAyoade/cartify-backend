import { Request, Response, NextFunction } from "express";

// add products to cart
export const addProducts = async (
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
      bestseller,
    } = req.body;
    const image1 = req.files.image1[0]
    const image2 = req.files.image2[0]
    const image3 = req.files.image3[0]
    const image4 = req.files.image4[0]

  } catch (error) {}
};

// list items
export const addProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

// list of products
export const productList = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

// delete products in cart
export const deleteProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

// remove product in cart
export const removeProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};

// add single products in cart
export const singleProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {};
