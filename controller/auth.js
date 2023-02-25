// outer module
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// inner module
import User from "../models/User.js";
import { wrapAsync } from "../utils/asyncHadler.js";
import { AppError } from "../utils/error.js";

const register = wrapAsync(async (req, res, next) => {
  const { username, email, password } = req.body;
  if (!email || !password) {
    throw new AppError(401, "ユーザ情報が不足しています");
  }
  const hassedPassword = hash(password);
  const newUser = new User({
    username,
    email,
    password: hassedPassword,
  });

  const savedUser = await newUser.save();
  res.status(200).send(savedUser);
});

const login = wrapAsync(async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    throw new AppError(404, "該当のユーザがいません");
  }
  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw new AppError(401, "ユーザ名かパスワードが間違っています。");
  }

  // JWT
  const token = generateAccessToken(
    { id: user._id, isAdmin: user.isAdmin },
    process.env.JWT_SEACRET_KEY
  );

  const { password: _password, isAdmin, ...other } = user._doc;
  res
    .cookie("access_token", token, { httpOnly: true })
    .status(201)
    .json({ ...other });
});

// ハッシュ化処理
function hash(data) {
  const salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(data, salt);
}

// トークン発行
function generateAccessToken(data, seacretKey) {
  return jwt.sign(data, seacretKey);
}

export { register, login };
