const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { verifyToken } = require('../middleware/authMiddleware');
const upload = require('../middleware/upload');

// Public routes
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEvent);

// Protected routes (admin only)
router.post('/', verifyToken, eventController.createEvent);
router.put('/:id', verifyToken, eventController.updateEvent);
router.delete('/:id', verifyToken, eventController.deleteEvent);

// Re-enable file upload route now that multer is installed
router.post('/upload', verifyToken, upload.single('image'), eventController.uploadEventImage);

module.exports = router;
