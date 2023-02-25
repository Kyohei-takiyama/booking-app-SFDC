import mongoose, { Schema } from "mongoose";

const roomSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    maxPeople: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    roomNumbers: [{ number: Number, unvaliableDates: [{ type: [Date] }] }],
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Room", roomSchema);
