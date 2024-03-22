import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchTheaters(req: NextFncReq, res: Response) {
  try {
    const { id } = req.body as { id: string };

    if (!id) {
      return res.status(401).json({
        success: false,
        message: "select a location",
      });
    }

    const theaters = await prismaClient.theater.findMany({
      where: { location: { id } },
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).json({
      message: "fetched all theater successfully",
      success: true,
      theaters,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
