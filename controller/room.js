import Room from "../models/Room";
import { wrapAsync } from "../utils/asyncHadler";

// 新規作成
const createRoom = wrapAsync(async (req, res, next) => {
  const newRoom = new Room(req.body);
  const savedRoom = await newRoom.save();
  res.status(201).json(savedRoom);
});
