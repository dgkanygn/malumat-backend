import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Comment = new Schema(
  {
    comment: {
      type: String,
      max: 250,
    },

    likes: {
      type: Array,
      default: [],
    },

    owner: {
      type: String,
      required: true,
    },

    post: {
      type: String,
      required: true,
    },

    authorImage: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Comment", Comment);
