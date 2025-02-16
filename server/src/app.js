import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: ["http://localhost:5173"],
    credentials: true,
  })
);
// origin: process.env.CORS_ORIGIN,

app.use(express.json({ limit: "99mb" }));
app.use(express.urlencoded({ extended: true, limit: "99mb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(morgan("dev"));

//routes declaration
// http://localhost:8000/api/v1/

// for testing purposes
app.get("/", (req, res) => res.send("this is a AI Resume Builder"));

//routes import
import userRouter from "./routes/user.routes.js";
import adminRouter from "./routes/admin.routes.js";




app.use("/api/v1/user", userRouter);
app.use("/api/v1/admin", adminRouter);

export { app };
