import { Server } from "socket.io";
import http from "http";
import express from "express";
import "dotenv/config";
import authSocketMiddleware from "./middleware/authSocketMiddleware";
const port = process.env.PORT || 8080;
const app = express();
const httpServer = http.createServer(app);
import prisma from "@repo/db/prisma";

const io = new Server(httpServer, {
  cors: {
    origin: "*",
  },
});
io.use(authSocketMiddleware);
io.on("connection", (socket) => {
  const userId = socket.data.userId;
  if (!userId) {
    console.log("Unauthorized socket");
    return socket.disconnect();
  }
  socket.emit("socket-connected");
  socket.on("get-document", async (documentId) => {
    try {
      const doc = await prisma.document.findUnique({
        where: {
          id: documentId,
        },
        include: {
          messages: {
            take: 50,
            orderBy: { createdAt: "asc" },
            include: {
              sender: {
                select: { username: true },
              },
            },
          },
        },
      });
      if (!doc) {
        return socket.emit("error", "Document not available");
      }
      const existingUser = await prisma.documentMember.findUnique({
        where: {
          documentId_memberId: {
            memberId: userId,
            documentId: documentId,
          },
        },
      });
      if (!existingUser) {
        return socket.emit("error", "You are not a member of this document.");
      }
      socket.join(documentId);
      socket.emit("document-joined", documentId);

      socket.emit("document-loaded", {
        content: doc.content,
        messages: doc.messages,
      });
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("send-changes", ({ documentId, delta }) => {
    try {
      if (!socket.rooms.has(documentId)) {
        return socket.emit("error", "Join document first");
      }
      socket.to(documentId).emit("receive-changes", { delta, userId });
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("save-document", async ({ documentId, content }) => {
    try {
      if (!socket.rooms.has(documentId)) {
        return socket.emit("error", "Please join document first");
      }
      await prisma.document.update({
        where: {
          id: documentId,
        },
        data: {
          content: content,
        },
      });
    } catch (error) {
      console.error(error);
    }
  });
  socket.on("chat", async ({ documentId, message }) => {
    try {
      if (!socket.rooms.has(documentId)) {
        return socket.emit("error", "Please join document first");
      }
      const saved = await prisma.message.create({
        data: {
          senderId: userId,
          documentId: documentId,
          messageData: message,
        },
        include: {
          sender: {
            select: { username: true },
          },
        },
      });
      if (!saved) {
        return socket.emit("error", "Error while sending message");
      }
      socket.to(documentId).emit("receive-message", saved);
      socket.emit("message-sent", saved);
    } catch (error) {
      console.error(error);
      return socket.emit("error", "Internal server error");
    }
  });
  socket.on("leave-document", (documentId) => {
    socket.leave(documentId);
  });
});
httpServer.listen(port, () => {
  console.log("socket.io running on port 8080");
});
