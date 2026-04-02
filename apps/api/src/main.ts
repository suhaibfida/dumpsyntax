import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import router from "./router/router";
import "dotenv/config";

const app = express();
const frontEndUrl = process.env.FRONTEND_URL;

app.use(express.json());
app.use(cookieParser());
const corsOptions = {
  origin: frontEndUrl,
  credentials: true,
};

app.use(cors(corsOptions));
app.options("/{*any}", cors(corsOptions));
app.use("/api/v1", router);
app.listen(process.env.PORT);
console.log("App is running  on 3000");
