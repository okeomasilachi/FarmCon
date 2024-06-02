const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Function to ensure directory exists synchronously
const ensureDirectoryExistenceSync = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Set up storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "uploads/";

    // Determine upload path based on the route or file field name
    if (file.fieldname === "profile_picture") {
      uploadPath = "uploads/profile_pictures/";
    } else if (file.fieldname === "product_image") {
      uploadPath = "uploads/product_images/";
    }

    ensureDirectoryExistenceSync(uploadPath); // No need for try-catch as fs.existsSync already checks existence

    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize upload
const upload = multer({ storage: storage });

// Middleware to handle Multer errors
function handleMulterErrors(err, req, res, next) {
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_UNEXPECTED_FILE") {
      return res.status(400).json({ error: "Unexpected file field" }).end();
    }
  }
  next(err); // Forward other errors to the default error handler
}

const uploadHandler = multer({ storage: storage });

module.exports = {
  uploadHandler,
  handleMulterErrors,
};
