import { Router } from "express";
import { authenticateUser } from "../middleware";
import { fetchTheaters, addTheater, deleteTheater } from "../handlers";

export const theaterRouter = Router();

theaterRouter.post("/", fetchTheaters);

theaterRouter.post("/add", authenticateUser, addTheater);

theaterRouter.delete("/delete", authenticateUser, deleteTheater);
