// outer module
import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";

// inner module
import { connectMongoDB } from "./controller/mongodb.js";
import { castErrorHandler } from "./utils/error.js";

// Router
import authRoute from "./routes/auth.js";
import hotelsRoute from "./routes/hotels.js";
import roomsRoute from "./routes/rooms.js";
import usersRoute from "./routes/users.js";

// config
dotenv.config();
const app = express();
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
app.use((err, req, res, next) => {
  if (err.name === "CastError") {
    const customError = castErrorHandler(err.status, err.stack);
    return res.status(customError.status).json(customError);
  }
  return res.status(err.status).json(err);
});

// build Server
app.listen(PORT, () => {
  console.log(`connected BackEnd on PORT ${PORT}`);
});
