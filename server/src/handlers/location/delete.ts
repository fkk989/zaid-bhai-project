import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function deleteLocation(req: NextFncReq, res: Response) {
  try {
    const { id } = req.body as {
      id: string;
    };

    const theater = await prismaClient.theater.deleteMany({
      where: {
        location: { id },
      },
    });

    const location = await prismaClient.location.delete({
      where: { id },
    });
    return res.status(200).json({
      message: "location deleted successfully",
      success: true,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
