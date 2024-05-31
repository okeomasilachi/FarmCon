/**
 * Express router for handling routes.
 * @module routes/index
 */

const express = require("express");

const router = express.Router();

const AppController = require("../controllers/AppController");
const AuthController = require("../controllers/AuthController");
const UsersController = require("../controllers/UsersController");
const ProductsController = require("../controllers/ProductsController");
const FeedbackController = require("../controllers/FeedbackController");
const upload = require("../utils/multer");

router.get("/status", AppController.getStatus);
router.get("/stats", AppController.getStats);

router.get("/connect", AuthController.getConnect);
router.get("/disconnect", AuthController.getDisconnect);

router.post("/users", UsersController.postNew);
router.get("/users", UsersController.getAll);
router.get("/users/me", UsersController.getMe);
router.put("/users/me", UsersController.updateMe);
router.delete("/users/me", UsersController.deleteMe);
router.post(
  "/users/:id/upload",
  upload.single("profile_picture"),
  UsersController.userImage,
);

router.post("/products", ProductsController.postNewProduct);
router.get("/products", ProductsController.getAllProducts);
router.get("/products/:id", ProductsController.getProduct);
router.put("/products/:id", ProductsController.updateProduct);
router.delete("/products/:id", ProductsController.deleteProduct);
router.post(
  "/products/:id/upload",
  upload.single("image"),
  ProductsController.productImage,
);

router.post("/feedback", FeedbackController.postNewFeedback);
router.get("/feedback/user/:user_id", FeedbackController.getFeedbackByUser);
router.get(
  "/feedback/product/:product_id",
  FeedbackController.getFeedbackByProduct,
);
router.delete("/feedback/:id", FeedbackController.deleteFeedback);

module.exports = router;
