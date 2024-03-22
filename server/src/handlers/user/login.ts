import { User } from "@prisma/client";
import { Request, Response } from "express";
import { z } from "zod";
import { PrismaSingleton } from "../../clients/db";
import { signAsync, verifyPassword } from "../../helpers";
import { userInput } from "./add";
const prismaClient = PrismaSingleton.getInstance().prisma;

// env var's
const secret = process.env.JWT_SECRET;

export async function loginUser(req: Request, res: Response) {
  try {
    const reqBody = req.body;

    const parsedInput = await userInput.safeParse(reqBody);
    if (!parsedInput.success) {
      return res.status(401).json({
        success: false,
        message: "Invalid Input",
      });
    }

    const { email, password } = parsedInput.data;

    const userInDb = await prismaClient.user.findUnique({ where: { email } });

    if (!userInDb) {
      return res.status(401).json({
        success: false,
        message: "no user found with that email",
      });
    }

    const validPassword = await verifyPassword(password, userInDb.password);

    if (!validPassword) {
      return res.status(401).json({
        success: false,
        message: "incorrect password",
      });
    }

    const signedToken = await signAsync({ email: userInDb.email, secret });
    // deleting user password before sending as a response
    userInDb.password = "";
    return res.status(200).json({
      success: true,
      message: "login successfull",
      user: userInDb,
      token: signedToken,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
