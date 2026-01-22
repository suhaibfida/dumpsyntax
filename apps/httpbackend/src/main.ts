import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router/router";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:3000",
  }),
);
app.use("api/v1", router);
app.listen(3000);
