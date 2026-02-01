import { Request, Response } from "express";
import prisma from "@repo/db/prisma";
const showDocument = async (req: Request, res: Response) => {
  const userId = req.userId;
  try {
    const docs = await prisma.document.findMany({
      where: {
        members: {
          some: {
            memberId: userId,
          },
        },
      },
      include: {
        owner: {
          select: {
            username: true,
          },
        },
      },
    });
    return res.status(200).json({
      message: "Documents fetched successfully",
      documents: docs,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
export default showDocument;
