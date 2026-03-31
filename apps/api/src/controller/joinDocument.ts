import { Request, Response } from "express";
import prisma from "@repo/db/prisma";

const joinDocument = async (req: Request, res: Response) => {
  const userId = req.userId;
  console.log(userId);
  const { data: documentId } = req.body;
  console.log(documentId + "{{{{{");

  if (!userId || !documentId) {
    return res.status(401).json({
      error: !userId ? "Invalid session" : "Document id not valid",
    });
  }
  try {
    const findDocument = await prisma.document.findUnique({
      where: {
        id: documentId,
      },
    });
    console.log(findDocument);
    console.log("backend api req");
    const alreadyJoined = await prisma.documentMember.findUnique({
      where: {
        documentId_memberId: {
          documentId: documentId,
          memberId: userId,
        },
      },
    });
    if (alreadyJoined) {
      return res.status(200).json({
        error: "Already joined",
      });
    }
    if (!findDocument) {
      return res.status(404).json({
        error: "Document does not exist",
      });
    }
    const doc = await prisma.documentMember.create({
      data: {
        memberId: userId,
        documentId: documentId,
      },
    });
    return res.status(200).json({
      message: "Joined successfully",
      doc,
    });
  } catch (error) {
    return res.status(400).json({
      error: "Internal server error",
    });
  }
};
export default joinDocument;
