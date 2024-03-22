import { Response } from "express";
import { NextFncReq } from "../../middleware";

import { PrismaSingleton } from "../../clients/db";
import { Location } from "@prisma/client";
const prismaClient = PrismaSingleton.getInstance().prisma;

export async function addTheater(req: NextFncReq, res: Response) {
  try {
    const user = req.user;
    const { id, name } = req.body as Location;

    const theateInDb = await prismaClient.theater.findFirst({
      where: { name, location: { id } },
    });

    if (theateInDb) {
      return res.status(401).json({
        success: false,
        message: "theater already exits",
      });
    }

    const theater = await prismaClient.theater.create({
      data: {
        name: name.toLowerCase(),
        location: { connect: { id } },
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
