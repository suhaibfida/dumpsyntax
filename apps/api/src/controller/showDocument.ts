import { Request, Response } from "express";
import prisma from "@repo/db/prisma";
const showDocument = async (req: Request, res: Response) => {
  console.log("dosigvkhnsadkf12335568799");
  console.log("dosigvkhnsadkf13456789");
  const userId = req.userId;
  console.log(userId);
  try {
    console.log(
      "dosigvkhnsadkf.vihzsEF:sjlhkzf/sdfjndflksdkdnkksdkn///////////////LDSKKJVNNL",
    );
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
    console.log("backedn");
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
