import express from "express";

const authRouter = express.Router();

import { register, login } from "../controllers/Auth.js";

// multer middleware
import { upload } from "../middleware/multer.js";

// register
authRouter.post("/register", upload.single("image"), register);

// login
authRouter.post("/login", login);

export default authRouter;
