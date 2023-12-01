import mongoose from "mongoose";

const Schema = mongoose.Schema;

const User = new Schema(
  {
    username: {
      type: String,
      required: true,
      max: 20,
      unique: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    password: {
      type: String,
      required: true,
      length: 6,
    },

    name: {
      type: String,
      max: 10,
    },

    surname: {
      type: String,
      max: 10,
    },

    bio: {
      type: String,
      max: 70,
    },

    image: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("User", User);
