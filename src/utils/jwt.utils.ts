import jwt from "jsonwebtoken";

export const generateToken = (userId: any): string => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET || "", {
    expiresIn: "1h",
  });
};

export const regToken = (newUser: any): string => {
  return jwt.sign({ email: newUser.email }, process.env.JWT_SECRET || "", {
    expiresIn: "10m",
  });
};
