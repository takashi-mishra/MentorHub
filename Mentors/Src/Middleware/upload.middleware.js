const multer = require("multer");

/**
 * Memory storage (required for ImageKit)
 */
const storage = multer.memoryStorage();

/**
 * Allow only images & PDFs
 */
const fileFilter = (req, file, cb) => {
  if (
    file.mimetype.startsWith("image") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    cb(new Error("Only images or PDFs are allowed"), false);
  }
};

const upload = multer({ storage, fileFilter });

module.exports = upload;
