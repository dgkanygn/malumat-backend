import express from "express";

const commentRouter = express.Router();

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
commentRouter.post("/createComment", createComment);

// yorum beğenme
commentRouter.put("/addLikesComment", addLikesComment);

// tüm yorumları getirme
commentRouter.get("/comments", getAllComments);

// spesifik bir yorumu getirme
commentRouter.get("/comment/:id", getCommentById);

// yorum güncelleme
commentRouter.put("/updateComment/:id", updateComment);

// yorum silme
commentRouter.delete("/deleteComment/:id", deleteComment);

// bir postun yorumlarını getirme
commentRouter.get("/getCommentByPostId/:postId", getCommentByPostId);

// sahibine göre yorum getirme
commentRouter.get("/getCommentByOwnerId/:ownerId", getCommentByOwnerId);

export default commentRouter;
