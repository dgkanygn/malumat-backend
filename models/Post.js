import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Post = new Schema(
  {
    title: {
      type: String,
      required: true,
      max: 56,
    },

    description: {
      type: String,
      max: 70,
    },

    post: {
      type: String,
      required: true,
      max: 500,
    },

    author: {
      type: String,
      required: true,
    },

    authorImage: {
      type: String,
      required: true,
    },

    favorites: {
      type: Array,
      default: [],
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Post", Post);
