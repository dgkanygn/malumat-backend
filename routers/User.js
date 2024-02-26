import express from "express";

const userRouter = express.Router();

import { checkToken } from "../middleware/checkToken.js";

import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserByUsername,
} from "../controllers/User.js";

// tüm kullanıcıları getir
userRouter.get("/users", getAllUsers);

// spesifik bir kullanıcı getir
userRouter.get("/user/:id", getUserById);

// kullanıcı sil
userRouter.delete("/deleteUser", checkToken, deleteUser);

// username ile kullanıcı getir
userRouter.get("/getUserByUsername/:username", getUserByUsername);

export default userRouter;
