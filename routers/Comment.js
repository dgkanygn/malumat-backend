import express from "express";

const commentRouter = express.Router();

import { checkToken } from "../middleware/checkToken.js";

import {
  createComment,
  deleteComment,
  getCommentById,
  getAllComments,
  updateComment,
  getCommentByPostId,
  getCommentByOwnerId,
  addLikesComment,
} from "../controllers/Comment.js";

// yeni yorum oluşturma
commentRouter.post("/createComment", checkToken, createComment);

// yorum beğenme
commentRouter.put("/addLikesComment", checkToken, addLikesComment);

// tüm yorumları getirme
commentRouter.get("/comments", getAllComments);

// spesifik bir yorumu getirme
commentRouter.get("/comment/:id", getCommentById);

// yorum güncelleme
commentRouter.put("/updateComment/:id", checkToken, updateComment);

// yorum silm
commentRouter.delete("/deleteComment/:id", checkToken, deleteComment);

// bir postun yorumlarını getirme
commentRouter.get("/getCommentByPostId/:postId", getCommentByPostId);

// sahibine göre yorum getirme
commentRouter.get("/getCommentByOwnerId/:ownerId", getCommentByOwnerId);

export default commentRouter;
