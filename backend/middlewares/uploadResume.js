// src/middleware/uploadResume.js
import multer from "multer";

const storage = multer.memoryStorage();

const allowed = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

function fileFilter(_req, file, cb) {
  if (allowed.includes(file.mimetype)) return cb(null, true);
  cb(new Error("Only PDF/DOC/DOCX files are allowed"));
}

const uploadResume = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter,
});

export default uploadResume;
