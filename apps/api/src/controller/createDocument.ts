import { Request, Response } from "express";
import { documentType } from "@repo/common/zod";
import prisma from "@repo/db/prisma";

const createDocument = async (req: Request, res: Response) => {
  const safeParse = documentType.safeParse(req.body);
  if (!safeParse.success) {
    return res.status(400).json({
      error: safeParse.error.issues,
    });
  }

  const id = req.userId;
  if (!id) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  try {
    const document = await prisma.$transaction(async (tx: any) => {
      const doc = await tx.document.create({
        data: {
          title: safeParse.data.title,
          content: safeParse.data.content,
          ownerId: id,
        },
      });
      await tx.documentMember.create({
        data: {
          memberId: id,
          documentId: doc.id,
        },
      });
      return doc;
    });
    return res.status(201).json({
      message: "Document created successfully",
      doc: document.id,
    });
  } catch (err) {
    return res.status(500).json({
      error: "Internal server error",
    });
  }
};
export default createDocument;
