// outer module
import { Router } from "express";
const route = Router();

// inner module
import {
  createHotel,
  deleteHotel,
  getAllHotel,
  getSingleHotel,
  updateHotel,
} from "../controller/hotel.js";

//===============================================GET
// 全検索
route.get("/", getAllHotel);

// IDで検索
route.get("/:id", getSingleHotel);

//===============================================POST
// 新規作成
route.post("/", createHotel);
//===============================================PUT
// 更新
route.put("/:id", updateHotel);
//===============================================DELETE
// 削除
route.delete("/:id", deleteHotel);

export default route;
