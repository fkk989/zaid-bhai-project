import { User } from "@prisma/client";
import { Request, Response, NextFunction } from "express";
import JWT from "jsonwebtoken";
import { PrismaSingleton } from "../clients";

export interface NextFncReq extends Request {
  user?: User;
}

const SECRET_KEY = process.env.JWT_SECRET;

// Middleware for user authentication
export const authenticateUser = async (
  req: NextFncReq,
  res: Response,
  next: NextFunction
) => {
  const token = req.headers.authorization;
  const prismaClient = PrismaSingleton.getInstance().prisma;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Not Authorized",
    });
  }

  try {
    const authToken = token.split(" ")[1];
    // Verify the JWT token
    const { email } = JWT.verify(authToken, SECRET_KEY) as { email: string };

    if (!email) {
      return res.status(401).json({
        success: false,
        message: "Not Authorized",
      });
    }
    // Fetch user from the database
    const user = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(401).json({
        success: false,
        message: "no user found",
      });
    }

    req.user = user;
    next();
  } catch (e: any) {
    res.status(401).json({
      success: false,
      message: e.message,
    });
  }
};
