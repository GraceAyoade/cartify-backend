import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import User from "../models/user.model";
import ErrorResponse from "../utils/errorResponse.utils";
import userMapper from "../mapper/userMapper";
import { generateToken, regToken } from "../utils/jwt.utils";
import validator from "validator";
import sendEmail from "../utils/sendEmails";
import jwt, { JwtPayload } from "jsonwebtoken";

export const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { firstName, lastName, name, email, password, nationality } = req.body;
  try {
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      next(new ErrorResponse("User already exists!", 400));
    }
    // Validate email
    if (!validator.isEmail(email)) {
      next(new ErrorResponse("Please enter a valid email", 400));
    }
    // Validate password strength
    if (password.length < 8) {
      next(new ErrorResponse("Please enter a strong password", 400));
    }
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    // Create new user
    const newUser = await User.create({
      email,
      password: hashedPassword,
      firstName,
      lastName,
      name,
      nationality,
    });
    // Generate token
    const token = generateToken(newUser._id);
    // Send response
    res.status(201).json({
      error: false,
      message: "User registered successfully",
      data: { authToken: token, user: userMapper(newUser) },
    });
    const tokenReg = regToken(email);
    const message = `Click on the link below to verify your email: \n http://localhost:3000/verify?token=${tokenReg}`;
    // Send welcome email
    await sendEmail({
      email: newUser.email,
      subject: "Welcome on board!",
      message,
    });
  } catch (error) {
    next(error);
  }
};

export const logIn = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<any> => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return next(new ErrorResponse("User not found!", 404));
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return next(new ErrorResponse("invalid credentials", 404));
    }
    const token = generateToken(user._id);
    res.status(200).json({
      error: false,
      message: "Login successful",
      data: { authToken: token, user: userMapper(user) },
    });
  } catch (error) {
    next(new ErrorResponse("Error logging in!", 404));
  }
};

export const verifyEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { token } = req.params;
  try {
    if (!token) {
      return next(new ErrorResponse("Invalid token", 400));
    }
    if (!process.env.JWT_SECRET) {
      return next(new ErrorResponse("please provide secret", 400));
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const email = (decoded as JwtPayload).email;
    const user = await User.findOneAndUpdate(
      { email },
      { isVerified: true },
      { new: true }
    );
    if (!user) {
      return next(new ErrorResponse("User not found!", 404));
    }
    res.status(200).json({
      error: false,
      message: "Email verified successfully!",
      data: user,
    });
  } catch (error) {
    return next(new ErrorResponse("invalid or expired token", 500));
  }
};

export const adminLogin = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET as string);
      res.status(200).json({
        error: false,
        message: "admin verified successfully",
        data: token,
      })
    }else{
      res.status(400).json({
        error: false,
        message: "invalid!",
        data: null,
      })
    }
  } catch (error) {
    return next(new ErrorResponse("invalid or expired token", 500));
  }
};
