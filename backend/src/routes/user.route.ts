import { Router } from "express";
import { login, register } from "../controllers/user/user.controller";

const userRouter = Router();

userRouter.post("/", register);
userRouter.get("/", login);
export { userRouter };