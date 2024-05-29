/**
 * Express router for handling routes.
 * @module routes/index
 */

const express = require('express');

const router = express.Router();

const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UsersController');
const ProductController = require('../controllers/ProductController');

/**
 * Route for getting the status of the application.
 * @name GET /status
 * @function
 */
router.get('/status', AppController.getStatus);

/**
 * Route for getting the statistics of the application.
 * @name GET /stats
 * @function
 */
router.get('/stats', AppController.getStats);

/**
 * Route for creating a new user.
 * @name POST /users
 * @function
 */
router.post('/users', UsersController.postNew);

/**
 * Route for connecting to a user.
 * @name GET /connect
 * @function
 */
router.get('/connect', AuthController.getConnect);

/**
 * Route for disconnecting from a user.
 * @name GET /disconnect
 * @function
 */
router.get('/disconnect', AuthController.getDisconnect);

/**
 * Route for getting the current user.
 * @name GET /users/me
 * @function
 */
router.get('/users/me', UsersController.getMe);


module.exports = router;
