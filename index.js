// outer module
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

// inner module
import { connectMongoDB } from "./controller/mongodb.js";
import errorHandler from "./utils/error.js";

// Router
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";

// config
dotenv.config();
const app = express();
app.use(cookieParser());
app.use(express.json());
const PORT = process.env.PORT || 8800;

// connect to mongoDB
connectMongoDB(process.env.MONGO_URI);

// api endpoints
app.use("/api/auth", authRoute);
app.use("/api/hotels", hotelsRoute);
app.use("/api/rooms", roomsRoute);
app.use("/api/users", usersRoute);

// Error Handring
app.use(errorHandler);

// build Server
app.listen(PORT, () => {
  console.log(`connected BackEnd on PORT ${PORT}`);
});
