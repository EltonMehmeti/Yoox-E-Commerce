const multer = require("multer");
const path = require("path");
const fs = require("fs");
require("dotenv").config();

const ImgPath = process.env.IMG_PATH;

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ImgPath);
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, Date.now() + path.extname(originalname));
  },
});

// Create the multer upload instance
const upload = multer({ storage });

// Middleware to handle file uploads for multiple files (max 3 in this case)
exports.uploadImages = upload.array("images", 3);

// Set up multer storage configuration for single image upload
const singleImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, ImgPath);
  },
  filename: (req, file, cb) => {
    const { originalname } = file;
    cb(null, Date.now() + path.extname(originalname));
  },
});

// Create the multer upload instance for single image upload
exports.uploadSingleImage = multer({ storage: singleImageStorage }).single(
  "image"
);

// Helper function to delete files from the server
exports.deleteFiles = (filePaths) => {
  filePaths.forEach((filePath) => {
    fs.unlink(filePath, (err) => {
      if (err) {
        console.error("Error deleting file:", filePath, err);
      } else {
        console.log("File deleted successfully:", filePath);
      }
    });
  });
};
