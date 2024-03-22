import { Response } from "express";
import { NextFncReq } from "../../middleware";
import { PrismaSingleton } from "../../clients/db";

const prismaClient = PrismaSingleton.getInstance().prisma;

export async function deleteUser(req: NextFncReq, res: Response) {
  try {
    const { email } = req.body;

    const userInDb = await prismaClient.user.findUnique({
      where: { email },
    });

    if (!userInDb) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    const deletedUser = await prismaClient.user.delete({
      where: { email },
    });

    return res.status(200).json({
      success: true,
      message: "deted user",
    });
  } catch (e: any) {
    return res.status(400).json({
      success: false,
      message: "user deletion unsuccessfull",
    });
  }
}
