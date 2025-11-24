import express from "express";
import dotenv from "dotenv";
import db from "./config/dbconnect.js";
import authRouter from "./routes/auth.routes.js";
import cookieParser from "cookie-parser";
import teacherRouter from "./routes/teachers.routes.js";
import { globalErrorHandler } from "./middlewares/globalErrorHandler.js";
import cors from "cors";

dotenv.config();
const app = express();
app.use(cookieParser());
// To parse JSON request bodies
app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

// app.use(express.urlencoded({ extended: true }));

const port = process.env.port;

app.use("/api/auth", authRouter);
app.use("/api/teacher", teacherRouter);
app.use(globalErrorHandler);

try {
  await db.connect();
  console.log("MySQL Connected Successfully!");
} catch (err) {
  console.error("MySQL Connection Failed:", err.message);
}

// Arrow Functioin is used here.
app.listen(port, () => {
  console.log(`server is running in port ${port}`);
});
