import { ObjectId, Types } from "mongoose";

export interface IUser extends Document {
  firstName?: string;
  lastName?: string;
  name: string;
  email: string;
  password: string;
  isVerified: boolean;
  nationality?: string;
  address?: string;
  cartData: Object;
}

export interface IProduct extends Document {
  name: string;
  description: string;
  price: number;
  category: string;
  subCategory: string;
  sizes?: [];
  color?: [];
  bestseller: boolean;
  quantity: number;
  image: any;
  date: number;
}

export interface IMailOptions {
  message: string;
  subject: string;
  email: string;
}

export interface IOrder {

}
