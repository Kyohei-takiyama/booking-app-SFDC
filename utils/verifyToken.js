// outer module
import jwt from "jsonwebtoken";

// inner module
import { AppError } from "./error.js";

export const verifyToken = (req, res, next) => {
  // クッキーからトークンを取得
  const token = req.cookies.access_token;
  if (!token) {
    throw new AppError(403, "認証に失敗しました");
  }
  // JWTを照合
  jwt.verify(token, process.env.JWT_SEACRET_KEY, (err, user) => {
    if (err) {
      throw new AppError(401, "トークンが不正です");
    }
    req.user = user;
    next();
  });
};
