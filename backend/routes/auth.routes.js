import express from "express";
import { getAllUsers, login, signout } from "../controller/auth.controller.js";
import { isLogin } from "../middlewares/isLogin.js";

const authRouter = express.Router();
authRouter.get("/users", isLogin, getAllUsers);
authRouter.post("/login", login);
authRouter.post("/signout",isLogin, signout);


export default authRouter;
