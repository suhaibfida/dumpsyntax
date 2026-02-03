import { Server } from "socket.io";
import http from "http";
import express from "express";
import "dotenv/config";
import authSocketMiddleware from "./middleware/authSocketMiddleware";
import errHandler from "./errHandler/err";
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
  socket.on(
    "get-document",
    errHandler(socket, async (documentId) => {
      const existingUser = await prisma.documentMember.findUnique({
        where: {
          documentId_memberId: {
            memberId: userId,
            documentId: documentId,
          },
        },
      });
      if (!existingUser) {
        socket.emit("error", "You are not a member of this document.");
        return;
      }
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
        socket.emit("error", "Document not available");
        return;
      }
      socket.join(documentId);
      socket.emit("document-joined", documentId);

      socket.emit("document-loaded", {
        content: doc.content,
        messages: doc.messages,
      });
    }),
  );
  socket.on(
    "send-changes",
    errHandler(socket, async ({ documentId, delta }) => {
      if (!socket.rooms.has(documentId)) {
        socket.emit("error", "Join document first");
        return;
      }
      socket.to(documentId).emit("receive-changes", { delta, userId });
    }),
  );
  socket.on(
    "save-document",
    errHandler(socket, async ({ documentId, content }) => {
      if (!socket.rooms.has(documentId)) {
        socket.emit("error", "Please join document first");
        return;
      }
      await prisma.document.update({
        where: {
          id: documentId,
        },
        data: {
          content: content,
        },
      });
    }),
  );
  socket.on(
    "chat",
    errHandler(socket, async ({ documentId, message }) => {
      if (!socket.rooms.has(documentId)) {
        socket.emit("error", "Please join document first");
        return;
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
        socket.emit("error", "Error while sending message");
        return;
      }
      socket.to(documentId).emit("receive-message", saved);
      socket.emit("message-sent", saved);
    }),
  );
  socket.on(
    "leave-document",
    errHandler(socket, async (documentId) => {
      socket.leave(documentId);
    }),
  );
});
httpServer.listen(port, () => {
  console.log("socket.io running on port 8080");
});
