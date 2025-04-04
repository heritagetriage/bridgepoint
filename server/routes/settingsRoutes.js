const express = require('express');
const router = express.Router();
const settingsController = require('../controllers/settingsController');
const { verifyToken, checkRole } = require('../middleware/authMiddleware');

/**
 * @route   GET /api/settings/:type
 * @desc    Get settings by type
 * @access  Public for general, Private/Admin for others
 */
router.get('/:type', async (req, res, next) => {
  // Allow public access to general settings
  if (req.params.type === 'general') {
    return settingsController.getSettings(req, res);
  }
  
  // Require admin access for other settings types
  verifyToken(req, res, () => {
    checkRole(['admin'])(req, res, () => {
      settingsController.getSettings(req, res);
    });
  });
});

/**
 * @route   GET /api/settings
 * @desc    Get all settings
 * @access  Public for general, Private/Admin for others
 */
router.get('/', async (req, res) => {
  settingsController.getAllSettings(req, res);
});

/**
 * @route   PUT /api/settings/:type
 * @desc    Update settings by type
 * @access  Public for general, Private/Admin for others
 */
router.put('/:type', (req, res, next) => {
  // Allow public access to update general settings
  if (req.params.type === 'general') {
    return settingsController.updateSettings(req, res);
  }
  
  // Require admin access for other settings types
  verifyToken(req, res, () => {
    checkRole(['admin'])(req, res, () => {
      settingsController.updateSettings(req, res);
    });
  });
});

module.exports = router;
