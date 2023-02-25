import { Router } from "express";

const route = Router();

// inner module
import {
  deleteUser,
  getAllUser,
  getSingleUser,
  updateUser,
  verifyAdmin,
  verifyUser,
} from "../controller/user.js";
import { verifyToken } from "../utils/verifyToken.js";

//===============================================GET
// 全検索
route.get("/", getAllUser);
route.get("/checkauth", verifyAdmin, (req, res, next) => {
  res.send("hello");
});
route.get("/checkuser/:id", verifyUser, (req, res, next) => {
  res.send("User logged in");
});

// IDで検索
route.get("/:id", verifyUser, getSingleUser);
//===============================================POST

//===============================================PUT
// 更新
route.put("/:id", verifyUser, updateUser);
//===============================================DELETE
// 削除
route.delete("/:id", verifyUser, deleteUser);
export default route;
