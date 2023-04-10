import multer, { diskStorage, FileFilterCallback } from "multer";
import path from "path";
import { Request } from "express";

// Multer config
const multerConfig = multer({
  storage: diskStorage({}),
  fileFilter: (req: Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    let ext = path.extname(file.originalname);  
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(null, false);
      return;
    }
    cb(null, true);
  },
});

export default multerConfig;
