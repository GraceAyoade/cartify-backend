import express from "express";
import { adminLogin, logIn, signUp, verifyEmail } from "../controllers/auth.controller";

const authRouter = express.Router();

authRouter.post("/signup", signUp);
authRouter.post("/login", logIn);
authRouter.get("/verify-email/:token", verifyEmail);
authRouter.post("/admin", adminLogin);

export default authRouter;
