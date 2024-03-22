import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
import { Location } from "@prisma/client";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function addLocation(req: NextFncReq, res: Response) {
  try {
    const user = req.user;
    const { name } = req.body as Location;

    const lcationInDb = await prismaClient.location.findUnique({
      where: { name: name.toLowerCase() },
    });

    if (lcationInDb) {
      return res.status(401).json({
        success: false,
        message: "location already exits",
      });
    }

    const location = await prismaClient.location.create({
      data: {
        name: name.toLowerCase(),
      },
    });

    return res.status(200).json({
      success: true,
      message: "location created successfully",
    });
  } catch (e: any) {
    return res.status(401).json({
      success: false,
      message: e.message,
    });
  }
}
