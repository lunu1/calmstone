// config/multer.config.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js";

const storage = new CloudinaryStorage({
  cloudinary,
  params: (_req, file) => ({
    folder: "banners",
    resource_type: "image",
    allowed_formats: ["jpg", "jpeg", "png", "webp"],
    // Limit dimensions + auto format/quality at upload time
    transformation: [
      { width: 1600, height: 1600, crop: "limit" },
      { fetch_format: "auto", quality: "auto" },
    ],
  }),
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB
});

export default upload;
