import { Router } from "express";
import { authenticateUser } from "../middleware";
import {
  loginUser,
  addNewUser,
  deleteUser,
  fetchUser,
  addDefaultUser,
} from "../handlers";

export const userRouter = Router();

userRouter.get("/", authenticateUser, fetchUser);
userRouter.get("/default", addDefaultUser);
userRouter.post("/login", loginUser);
userRouter.post("/add", authenticateUser, addNewUser);
userRouter.delete("/delete", authenticateUser, deleteUser);
