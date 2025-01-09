import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import ErrorResponse from "../utils/errorResponse.utils";

export function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
): any {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res
      .status(401)
      .json({ error: true, message: "Access Denied", data: null });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "");
    req.user = decoded;
    next();
  } catch {
    res.status(403).json({ message: "Invalid Token" });
  }
}

export const adminAuth: any = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const token: string = req.headers.token as string;
    if (!token) {
      return res
        .status(401)
        .json({ error: true, message: "Access Denied", data: null });
    }
    const token_decode = jwt.verify(token, process.env.JWT_SECRET || "");
    if (
      token_decode !==
      process.env.ADMIN_EMAIL! + process.env.ADMIN_PASSWORD
    ) {
      return res
        .status(401)
        .json({ error: true, message: "Access Denied", data: null });
    }
    next();
  } catch (error) {
    return next(new ErrorResponse("Null!", 400));
  }
};
