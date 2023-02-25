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
import { verifyAdmin } from "../controller/user.js";

//===============================================GET
// 全検索
route.get("/", getAllHotel);

// IDで検索
route.get("/:id", getSingleHotel);

//===============================================POST
// 新規作成
route.post("/", verifyAdmin, createHotel);
//===============================================PUT
// 更新
route.put("/:id", verifyAdmin, updateHotel);
//===============================================DELETE
// 削除
route.delete("/:id", verifyAdmin, deleteHotel);

export default route;
