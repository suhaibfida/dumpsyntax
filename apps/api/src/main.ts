import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router/router";
import "dotenv/config";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
  }),
);
app.use("/api/v1", router);
app.listen(3000);
