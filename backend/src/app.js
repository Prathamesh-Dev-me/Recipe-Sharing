import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

app.use(express.json({limit: "16kb"}));
app.use(express.urlencoded({limit: "16kb"}));
app.use(cookieParser());
app.use(express.static("public"));
app.use(cors()); // need to add origin

// routes
import userRouter from "./routes/user.routes.js"
import foodRouter from "./routes/food.route.js"

app.use("/api/v1/user", userRouter);
app.use("/api/v1/food", foodRouter)

export default app;