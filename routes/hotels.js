import { Router } from "express";

import Hotel from "../models/Hotel.js";

import { AppError } from "../utils/error.js";
import { wrapAsync } from "../utils/asyncHadler.js";
const route = Router();

//===============================================GET
// 全ホテル検索
route.get(
  "/",
  wrapAsync(async (req, res, next) => {
    const hotels = await Hotel.find();
    if (!hotels) {
      throw new AppError(404, "該当のホテルが見つかりません");
    }
    res.status(201).json(hotels);
  })
);

// IDでホテル検索
route.get(
  "/:id",
  wrapAsync(async (req, res) => {
    const hotelId = req.params.id;
    const hotel = await Hotel.findById(hotelId);
    if (!hotel) {
      throw new AppError(404, "該当のホテルが見つかりません");
    }
    res.status(201).json(hotel);
  })
);

//===============================================POST
route.post(
  "/",
  wrapAsync(async (req, res, next) => {
    const newHotel = new Hotel(req.body);
    const savedHotel = await newHotel.save();
    res.status(201).json(savedHotel);
  })
);
//===============================================PUT
route.put(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const hotelId = req.params.id;
    const updatedHotel = await Hotel.findByIdAndUpdate(
      hotelId,
      { $set: req.body },
      { new: true }
    );
    res.status(201).json(updatedHotel);
  })
);
//===============================================DELETE
route.delete(
  "/:id",
  wrapAsync(async (req, res, next) => {
    const hotelId = req.params.id;
    await Hotel.findByIdAndDelete(hotelId);
    res.status(201).json({ message: "ホテルを削除しました" });
  })
);

export default route;
