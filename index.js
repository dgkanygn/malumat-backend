import express from "express";
import cors from "cors";

import { connectDB } from "./database.js";

import authRouter from "./routers/Auth.js";
import userRouter from "./routers/User.js";
import postRouter from "./routers/Post.js";
import commentRouter from "./routers/Comment.js";

const app = express();
app.use(express.json());
app.use(cors());

const port = process.env.PORT;

app.use("/", authRouter);
app.use("/", userRouter);
app.use("/", postRouter);
app.use("/", commentRouter);

app.listen(port, () => {
  console.log(`${port}. porttan dinleniyor...`);
  connectDB();
});
