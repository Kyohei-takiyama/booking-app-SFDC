import mongoose from "mongoose";

export const connectMongoDB = async (mongo_uri) => {
  try {
    await mongoose.connect(mongo_uri);
    console.log("connected to mongodb");
  } catch (error) {
    console.error("ERROR::::", error.message);
  }
};
