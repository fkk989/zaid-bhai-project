import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function deleteTheater(req: NextFncReq, res: Response) {
  try {
    const { locationId, id } = req.body as {
      locationId: string;
      id: string;
    };

    if (!id || !locationId) {
      return res.status(401).json({
        success: false,
        message: "select a theater",
      });
    }

    const theater = await prismaClient.theater.deleteMany({
      where: {
        location: { id: locationId },
        id,
      },
    });

    return res.status(200).json({
      message: "theater deleted successfully",
      success: true,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
