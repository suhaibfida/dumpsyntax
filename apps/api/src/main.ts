import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router/router";
import "dotenv/config";

const app = express();
const frontEndUrl = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "https://dumpsyntax.suhaibfida.dev",
    credentials: true,
  }),
);
app.use("/api/v1", router);
app.listen(3001);
console.log("App is running  on 3001");
