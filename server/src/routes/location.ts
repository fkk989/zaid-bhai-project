import { Router } from "express";
import { authenticateUser } from "../middleware";
import { addLocation, fetchLocations, deleteLocation } from "../handlers";

export const locationRouter = Router();

locationRouter.get("/", fetchLocations);

locationRouter.post("/add", authenticateUser, addLocation);

locationRouter.delete("/delete", authenticateUser, deleteLocation);
