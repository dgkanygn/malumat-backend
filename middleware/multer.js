import multer from "multer";
import path from "path";

export const upload = multer({
  storage: multer.diskStorage({}),
  fileFilter: (req, file, cb) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("desteklenmeyen dosya formatı"), false);
      return;
    }
    cb(null, true);
  },
});
