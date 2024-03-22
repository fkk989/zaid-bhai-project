import { User } from "@prisma/client";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { PrismaSingleton } from "../../clients/db";
import { signAsync } from "../../helpers";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function addDefaultUser(req: Request, res: Response) {
  // env var's
  const SALT_ROUNDS = parseInt(process.env.SALT_ROUNDS);
  const secret = process.env.JWT_SECRET;
  const email = process.env.DEFAULT_USER_EMAIL;
  const password = process.env.DEFAULT_USER_PASSWORD;
  const name = process.env.DEFAULT_USER_NAME;
  try {
    // hashing password
    const salt = await bcrypt.genSalt(SALT_ROUNDS);
    const hashedPassword = await bcrypt.hash(password, salt);

    const userInDb = await prismaClient.user.findUnique({ where: { email } });

    if (userInDb) {
      return res.status(401).json({
        success: false,
        message: "user already present",
      });
    }

    const user = await prismaClient.user.create({
      data: {
        name: name!,
        email,
        password: hashedPassword,
      },
    });

    const signedToken = await signAsync({ email: user.email, secret });

    // deleting user password before sending as a response
    user.password = "";
    return res.status(200).json({
      success: true,
      message: "user created successfully",
      user,
      token: signedToken,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
