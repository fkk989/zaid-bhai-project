import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function fetchLocations(req: NextFncReq, res: Response) {
  try {
    const location = await prismaClient.location.findMany({
      orderBy: { createdAt: "asc" },
    });

    return res.status(200).json({
      success: true,
      location,
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
