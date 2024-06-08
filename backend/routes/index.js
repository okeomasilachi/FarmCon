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
const uploadHandler = require("../utils/multer").uploadHandler;
const handleMulterErrors = require("../utils/multer").handleMulterErrors;

router.get("/status", AppController.getStatus);
router.get("/stats", AppController.getStats);

router.get("/connect", AuthController.getConnect);
router.get("/disconnect", checkAuth, AuthController.getDisconnect);

router.post(
  "/users",
  uploadHandler.single("profile_picture"),
  handleMulterErrors,
  UsersController.postNew,
);
router.get("/users", UsersController.getAll);
router.get("/users/me", checkAuth, UsersController.getMe);
router.put("/users/me", checkAuth, UsersController.updateMe);
router.delete("/users/me", checkAuth, UsersController.deleteMe);
router.post(
  "/user/:id/upload",
  checkAuth,
  uploadHandler.single("profile_picture"),
  handleMulterErrors,
  UsersController.userImage,
);

router.post(
  "/products",
  checkAuth,
  uploadHandler.single("product_image"),
  handleMulterErrors,
  ProductsController.postNewProduct,
);
router.get("/products", ProductsController.getAllProducts);
router.get("/product/:id", checkAuth, ProductsController.getProduct);
router.get("/products/:user_id", ProductsController.getProductByUser);
router.put("/products/:id", checkAuth, ProductsController.updateProduct);
router.delete("/products/:id", checkAuth, ProductsController.deleteProduct);
router.post(
  "/product/:id/upload",
  checkAuth,
  uploadHandler.single("product_image"),
  handleMulterErrors,
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
