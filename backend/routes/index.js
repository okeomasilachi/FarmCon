/**
 * Express router for handling routes.
 * @module routes/index
 */

const express = require('express');

const router = express.Router();

const AppController = require('../controllers/AppController');
const AuthController = require('../controllers/AuthController');
const UsersController = require('../controllers/UsersController');


router.get('/status', AppController.getStatus);
router.get('/stats', AppController.getStats);

router.get('/connect', AuthController.getConnect);
router.get('/disconnect', AuthController.getDisconnect);

router.post('/users', UsersController.postNew);
router.get('/users/me', UsersController.getMe);
router.put('/users/me', UsersController.updateMe);
router.delete('/users/me', UsersController.deleteMe);

module.exports = router;
