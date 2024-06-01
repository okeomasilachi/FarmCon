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
const checkAuth = require("../utils/tools").checkAuth;
const upload = require("../utils/multer");

router.get("/status", AppController.getStatus);
router.get("/stats", AppController.getStats);

router.get("/connect", AuthController.getConnect);
router.get("/disconnect", checkAuth, AuthController.getDisconnect);

router.post("/users", UsersController.postNew);
router.get("/users", UsersController.getAll);
router.get("/users/me", checkAuth, UsersController.getMe);
router.put("/users/me", checkAuth, UsersController.updateMe);
router.delete("/users/me", checkAuth, UsersController.deleteMe);
// router.post(
//   "/users/:id/upload",
//   upload.single("profile_picture"),
//   checkAuth,
//   UsersController.userImage,
// );

router.post("/products", checkAuth, ProductsController.postNewProduct);
router.get("/products", checkAuth, ProductsController.getAllProducts);
router.get("/products/:id", checkAuth, ProductsController.getProduct);
router.put("/products/:id", checkAuth, ProductsController.updateProduct);
router.delete("/products/:id", checkAuth, ProductsController.deleteProduct);

// router.post(
//   "/products/:id/upload",
//   upload.single("image"),
//   ProductsController.productImage,
// );

router.post("/feedback", FeedbackController.postNewFeedback);
router.get("/feedback/user/:user_id", FeedbackController.getFeedbackByUser);
router.get(
  "/feedback/product/:product_id",
  FeedbackController.getFeedbackByProduct,
);
router.delete("/feedback/:id", FeedbackController.deleteFeedback);

module.exports = router;
