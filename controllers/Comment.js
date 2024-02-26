import Comment from "../models/Comment.js";
import User from "../models/User.js";
import Post from "../models/Post.js";

// yeni yorum oluşturma
export const createComment = async (req, res) => {
  try {
    const { comment, ownerId, postId, authorImage } = req.body;

    const newComment = await Comment.create({
      owner: ownerId,
      post: postId,
      comment,
      authorImage,
    });

    await User.updateOne({ $push: { comments: newComment._id } });
    await Post.updateOne({ $push: { comments: newComment._id } });

    res.status(201).json({ newComment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// tüm yorumları getirme
export const getAllComments = async (req, res) => {
  try {
    const getComments = await Comment.find();

    res.status(200).json({ getComments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// spesifik bir yorumu getirme
export const getCommentById = async (req, res) => {
  try {
    const { id } = req.params;

    const getComment = await Comment.findById(id);

    res.status(200).json({ getComment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// yorum güncelleme
export const updateComment = async (req, res) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const updatedComment = await Comment.findByIdAndUpdate(
      id,
      { comment },
      {
        new: true,
      }
    );

    res.status(200).json({ updatedComment });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// yorum silme
export const deleteComment = async (req, res) => {
  try {
    const { id } = req.params;

    await Comment.findByIdAndRemove(id);

    res.status(200).json({ message: "comment silme işlemi başarılı" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// ??
export const searchComment = async (req, res) => {
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

// bir postun yorumlarını getirme
export const getCommentByPostId = async (req, res) => {
  try {
    const { postId } = req.params;

    const comments = await Comment.find({ post: postId });

    res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// sahibine göre yorum getirme
export const getCommentByOwnerId = async (req, res) => {
  try {
    const { ownerId } = req.params;

    const comments = await Comment.find({ owner: ownerId });

    res.status(200).json({ comments });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// yorum beğenme
export const addLikesComment = async (req, res) => {
  const { commentId, userId } = req.body;

  try {
    const comment = await Comment.findById(commentId);

    if (comment.likes.includes(userId)) {
      const updated = await Comment.findByIdAndUpdate(
        commentId,
        { $pull: { likes: userId } },
        { new: true }
      );

      return res
        .status(200)
        .json({ message: "yorum beğenilmekten vazgeçildi.", updated });
    } else {
      const updated = await Comment.findByIdAndUpdate(
        commentId,
        { $push: { likes: userId } },
        { new: true }
      );
      return res.status(200).json({ message: "yorum beğenildi.", updated });
    }
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
