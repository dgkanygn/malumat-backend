import User from "../models/User.js";
import Post from "../models/Post.js";
import Comment from "../models/Comment.js";

import bcryptjs from "bcryptjs";

// tüm kullanıcıları getirme
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find();

    if (!users) {
      return res.status(404).json({ message: "hiç kullanıcı yok" });
    }

    res.status(200).json({ users });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// id'ye göre kullanıcı getirme
export const getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// username'e göre kullanıcı getirme
export const getUserByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const user = await User.findOne({ username });

    res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// kullanıcı silme
export const deleteUser = async (req, res) => {
  try {
    const { username, password } = req.query;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı." });
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Geçersiz şifre." });
    }

    const postsToDelete = await Post.find({ author: username });
    const commentsToDelete = await Comment.find({ owner: username });

    for (const post of postsToDelete) {
      await post.deleteOne();
    }
    for (const comment of commentsToDelete) {
      await comment.deleteOne();
    }

    await user.deleteOne({ username });

    res.status(200).json({
      message: "Kullanıcı başarıyla silindi.",
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
