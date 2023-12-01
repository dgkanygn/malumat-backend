import User from "../models/User.js";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import cloudinary from "../utils/cloudinary.js";

import { validateEmail, validateUsername } from "../helpers/Validate.js";

// register
export const register = async (req, res) => {
  try {
    const { username, email, password, bio, name, surname } = req.body;

    const result = await cloudinary.uploader.upload(req.file.path);

    const user = await User.findOne({ email });

    const currenUsername = await User.findOne({ username });

    if (user) {
      return res.status(500).json({
        message: "bu mail adresi ile kayıtlı bir kullanıcı zaten var",
      });
    }

    if (currenUsername) {
      return res.status(500).json({ message: "bu kullanıcı adı alınmış" });
    }

    if (!validateEmail(email)) {
      return res.status(500).json({ message: "geçersiz mail adresi" });
    }

    if (!validateUsername(username)) {
      return res.status(500).json({
        message:
          "kullanıcı adı belirlerken türkçe ve boşluk karakteri kullanmayın",
      });
    }

    if (password.length < 6) {
      return res
        .status(500)
        .json({ message: "parola en az 6 karakter olmalı" });
    }

    const hashedPassword = bcryptjs.hashSync(password);

    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      bio,
      name,
      surname,
      image: result ? result.secure_url : " ",
    });

    res.status(201).json({
      newUser,
    });
  } catch (error) {
    return res.status(500).json({ message: error.messaeg });
  }
};

// login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(500).json({ message: "böyle bir kullanıcı yok" });
    }

    const comparePassword = await bcryptjs.compare(password, user.password);

    if (!validateEmail(email)) {
      return res.status(500).json({ message: "geçersiz mail adresi" });
    }

    if (!comparePassword) {
      return res.status(500).json({ message: "yanlış parola" });
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_TOKEN, {
      expiresIn: "1h",
    });

    res.status(200).json({
      user,
      token,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
