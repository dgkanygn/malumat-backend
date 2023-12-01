import jwt from "jsonwebtoken";

export const checkToken = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];

    if (!token) return res.status(401).send("Erişim reddedildi.");

    jwt.verify(token, process.env.SECRET_TOKEN);

    next();
  } catch (error) {
    return res.status(401).json({ message: error.message });
  }
};
