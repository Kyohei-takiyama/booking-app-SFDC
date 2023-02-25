// inner module
import User from "../models/User.js";
import { AppError } from "../utils/error.js";
import { wrapAsync } from "../utils/asyncHadler.js";
import { verifyToken } from "../utils/verifyToken.js";

// 全ユーザ検索
const getAllUser = wrapAsync(async (req, res, next) => {
  const users = await User.find();
  if (!users) {
    throw new AppError(404, "該当のユーザが見つかりません");
  }
  res.status(201).json(users);
});

// IDで検索
const getSingleUser = wrapAsync(async (req, res) => {
  const userId = req.params.id;
  const user = await User.findById(userId);
  if (!User) {
    throw new AppError(404, "該当のユーザが見つかりません");
  }
  res.status(201).json(user);
});

// 新規作成
const createUser = wrapAsync(async (req, res, next) => {
  const newUser = new User(req.body);
  const savedUser = await newUser.save();
  res.status(201).json(savedUser);
});

// 更新
const updateUser = wrapAsync(async (req, res, next) => {
  const UserId = req.params.id;
  const updatedUser = await User.findByIdAndUpdate(
    UserId,
    { $set: req.body },
    { new: true }
  );
  res.status(201).json(updatedUser);
});

// 削除
const deleteUser = wrapAsync(async (req, res, next) => {
  const UserId = req.params.id;
  await User.findByIdAndDelete(UserId);
  res.status(201).json({ message: "ユーザを削除しました" });
});

// JWT認証
const verifyUser = (req, res, next) => {
  verifyToken(req, res, () => {
    if (req.user.id === req.params.id || req.user.isAdmin) {
      next();
    } else {
      throw new AppError(403, "認証に失敗しました");
    }
  });
};

export {
  getAllUser,
  getSingleUser,
  createUser,
  updateUser,
  deleteUser,
  verifyUser,
};
