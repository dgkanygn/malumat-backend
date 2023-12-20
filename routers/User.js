import express from "express";

const userRouter = express.Router();

import { checkToken } from "../middleware/checkToken.js";

import {
  changePassword,
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
  updatedUser,
} from "../controllers/User.js";

// tüm kullanıcıları getir
userRouter.get("/users", getAllUsers);

// spesifik bir kullanıcı getir
userRouter.get("/user/:id", getUserById);

// kullanıcı sil
userRouter.delete("/deleteUser", checkToken, deleteUser);

// username ile kullanıcı getir
userRouter.get("/getUserByUsername/:username", getUserByUsername);

// kullanıcı güncelle
// userRouter.put("/updateUser/:id", checkToken, updatedUser);

// şifre güncelle
// userRouter.put("/changePassword/:id", checkToken, changePassword);

export default userRouter;
