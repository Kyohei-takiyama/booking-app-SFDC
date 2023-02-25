// inner module
import Hotel from "../models/Hotel.js";
import { AppError } from "../utils/error.js";
import { wrapAsync } from "../utils/asyncHadler.js";

// 全ホテル検索
const getAllHotel = wrapAsync(async (req, res, next) => {
  const hotels = await Hotel.find();
  if (!hotels) {
    throw new AppError(404, "該当のホテルが見つかりません");
  }
  res.status(201).json(hotels);
});

// IDで検索
const getSingleHotel = wrapAsync(async (req, res) => {
  const hotelId = req.params.id;
  const hotel = await Hotel.findById(hotelId);
  if (!hotel) {
    throw new AppError(404, "該当のホテルが見つかりません");
  }
  res.status(201).json(hotel);
});

// 新規作成
const createHotel = wrapAsync(async (req, res, next) => {
  const newHotel = new Hotel(req.body);
  const savedHotel = await newHotel.save();
  res.status(201).json(savedHotel);
});

// 更新
const updateHotel = wrapAsync(async (req, res, next) => {
  const hotelId = req.params.id;
  const updatedHotel = await Hotel.findByIdAndUpdate(
    hotelId,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json(updatedHotel);
});

// 削除
const deleteHotel = wrapAsync(async (req, res, next) => {
  const hotelId = req.params.id;
  await Hotel.findByIdAndDelete(hotelId);
  res.status(201).json({ message: "ホテルを削除しました" });
});

export { getAllHotel, getSingleHotel, createHotel, updateHotel, deleteHotel };
