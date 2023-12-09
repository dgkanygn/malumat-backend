import Post from "../models/Post.js";
import User from "../models/User.js";
import Comment from "../models/Comment.js";
import cloudinary from "../utils/cloudinary.js";

// post oluşturma
export const createPost = async (req, res) => {
  try {
    const { title, description, post, authorId, authorImage } = req.body;

    let imageUrl;

    console.log(req.file);

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      imageUrl = result.secure_url;
    } else {
      imageUrl = " ";
    }

    const newPost = await Post.create({
      title,
      description,
      post,
      author: authorId,
      image: imageUrl,
      authorImage,
    });

    await User.updateOne({ $push: { posts: newPost._id } });

    res.status(201).json({ newPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// postları getirme
export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find();

    res.status(201).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// id'ye göre post getirme
export const getPostById = async (req, res) => {
  try {
    const { id } = req.params;

    const post = await Post.findById(id);

    res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// post güncelleme
export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ updatedPost });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// post silme
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;

    await Post.findByIdAndRemove(id);
    await Comment.deleteMany({ post: id });

    res
      .status(201)
      .json({ message: "post ve ilişkili olduğu bütün document'lar silindi" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// post arama ???
export const searchPost = async (req, res) => {
  const { search, tag } = req.query;
  try {
    const title = new RegExp(search, "i");

    const posts = await Post.find({
      $or: [{ title }],
      tag: { $in: tag.split(",") },
    });

    res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// sahibine göre post getirme
export const getPostsByAuthorId = async (req, res) => {
  try {
    const { authorId } = req.params;

    const posts = await Post.find({ author: authorId });

    res.status(200).json({ posts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// title'ına göre post getirme
export const getPostByTitle = async (req, res) => {
  try {
    const { title } = req.params;

    const post = await Post.findOne({ title });

    res.status(200).json({ post });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// postu favorilere ekleme
export const addFavoritesPost = async (req, res) => {
  const { userId, postId } = req.body;

  try {
    const post = await Post.findById(postId);

    if (post.favorites.includes(userId)) {
      const updated = await Post.findByIdAndUpdate(
        postId,
        { $pull: { favorites: userId } },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "post favorilerden çıkarıldı", updated });
    } else {
      const updated = await Post.findByIdAndUpdate(
        postId,
        { $push: { favorites: userId } },
        { new: true }
      );
      return res
        .status(200)
        .json({ message: "post favorilere eklendi", updated });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// favorilenen post'ları getirme
export const getFavoritePost = async (req, res) => {
  try {
    const { userId } = req.params;

    const favorites = await Post.find({ favorites: userId });

    res.status(200).json({ favorites });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// id'ye göre post favori sayısı döndürme
export const getFavLengthById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    const favLength = post.favorites.length;
    return res.json({ favLength });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// post ve kullanıcıları filtreleme
export const filterPostAndUser = async (req, res) => {
  try {
    const { char } = req.params;

    const posts = await Post.find({
      title: { $regex: char, $options: "i" },
    }).exec();
    const users = await User.find({
      username: { $regex: char, $options: "i" },
    }).exec();

    const filteredResults = [...posts, ...users];

    res.json(filteredResults);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// trend postları getirme
export const getTrends = async (req, res) => {
  try {
    const limit = 6;
    const trends = await Post.find().exec();
    trends.sort((a, b) => b.favorites.length - a.favorites.length); // Büyükten küçüğe sıralama
    const limitedPosts = trends.slice(0, limit); // İstenen sınırı uygula
    res.status(201).json({ limitedPosts });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
