const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

// Request logging middleware
router.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  next();
});

// Auth routes
router.post('/register', verifyToken, checkRole(['admin']), authController.register);
router.post('/register-test', authController.register); // Test route without auth for debugging
router.post('/login', authController.login);
router.get('/me', verifyToken, authController.getMe);
router.get('/users', verifyToken, checkRole(['admin']), authController.getUsers);
router.get('/test-users', authController.getTestUsers); // Test endpoint to get test users

// User management routes (admin only)
router.delete('/users/:userId', verifyToken, checkRole(['admin']), authController.deleteUser);
router.put('/users/:userId', verifyToken, checkRole(['admin']), authController.updateUser);

module.exports = router;
