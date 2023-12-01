import express from "express";

const postRouter = express.Router();

import {
  createPost,
  deletePost,
  getPostById,
  getAllPosts,
  updatePost,
  getPostsByAuthorId,
  addFavoritesPost,
  getFavoritePost,
  getFavLengthById,
  filterPostAndUser,
  getTrends,
} from "../controllers/Post.js";

// multer
import { upload } from "../middleware/multer.js";

// post oluştur
postRouter.post("/createPost", upload.single("image"), createPost);

// postu favorilere ekle
postRouter.put("/addFavoritesPost", addFavoritesPost);

// tüm postları getir
postRouter.get("/posts", getAllPosts);

// spesifik bir post getir
postRouter.get("/post/:id", getPostById);

// kullancının favori postlarını getir
postRouter.get("/getFavoritePost/:userId", getFavoritePost);

// post güncelle
postRouter.patch("/updatePost/:id", updatePost);

// post sil
postRouter.delete("/deletePost/:id", deletePost);

// sahibinin id'si ile post getir
postRouter.get("/getPostsByAuthorId/:authorId", getPostsByAuthorId);

// favorilenen postları getir
postRouter.get("/getFavLengthById/:postId", getFavLengthById);

// kullanıcı veya post filtreleme
postRouter.get("/filter/:char", filterPostAndUser);

// trend postları getir
postRouter.get("/trends", getTrends);

export default postRouter;
