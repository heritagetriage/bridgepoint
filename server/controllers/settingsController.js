const Settings = require('../models/Settings');

/**
 * Get settings by type
 * @param {string} type - The settings type (general, notifications, security)
 * @returns {Promise<object>} The settings data
 */
const getSettingsByType = async (type) => {
  try {
    const settings = await Settings.findOne({ type });
    
    // If settings don't exist yet, return default values
    if (!settings) {
      return getDefaultSettings(type);
    }
    
    return settings.data;
  } catch (error) {
    console.error(`Error getting ${type} settings:`, error);
    throw error;
  }
};

/**
 * Get default settings by type
 * @param {string} type - The settings type
 * @returns {object} Default settings
 */
const getDefaultSettings = (type) => {
  switch (type) {
    case 'general':
      return {
        siteName: "BridgePoint Strategies",
        siteDescription: "Creating powerful connections between organizations, communities, and cultures to drive meaningful change and sustainable growth across borders.",
        contactEmail: "info@bridgepoint-strategies.com",
        contactPhone: "(123) 456-7890",
        address: "Washington D.C."
      };
    case 'notifications':
      return {
        emailNotifications: true,
        messageAlerts: true,
        eventReminders: true,
        systemUpdates: false
      };
    case 'security':
      return {
        requireStrongPasswords: true,
        sessionTimeout: "30",
        twoFactorAuth: false
      };
    default:
      return {};
  }
};

/**
 * @route   GET /api/settings/:type
 * @desc    Get settings by type
 * @access  Public
 */
exports.getSettings = async (req, res) => {
  try {
    const { type } = req.params;
    
    // Validate type
    if (!['general', 'notifications', 'security'].includes(type)) {
      return res.status(400).json({ message: 'Invalid settings type' });
    }
    
    const settings = await getSettingsByType(type);
    
    res.json(settings);
  } catch (error) {
    console.error('Error getting settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @route   GET /api/settings
 * @desc    Get all settings
 * @access  Public for general, Private/Admin for others
 */
exports.getAllSettings = async (req, res) => {
  try {
    // For non-admin users, only return general settings
    if (!req.user || req.user.role !== 'admin') {
      const generalSettings = await getSettingsByType('general');
      return res.json({ general: generalSettings });
    }
    
    // For admin users, return all settings
    const [general, notifications, security] = await Promise.all([
      getSettingsByType('general'),
      getSettingsByType('notifications'),
      getSettingsByType('security')
    ]);
    
    res.json({
      general,
      notifications,
      security
    });
  } catch (error) {
    console.error('Error getting all settings:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

/**
 * @route   PUT /api/settings/:type
 * @desc    Update settings by type
 * @access  Public for general, Private/Admin for others
 */
exports.updateSettings = async (req, res) => {
  try {
    const { type } = req.params;
    const { data } = req.body;
    
    // Validate type
    if (!['general', 'notifications', 'security'].includes(type)) {
      return res.status(400).json({ message: 'Invalid settings type' });
    }
    
    // Validate data
    if (!data || typeof data !== 'object') {
      return res.status(400).json({ message: 'Invalid settings data' });
    }
    
    // For non-general settings, user must be authenticated
    if (type !== 'general' && (!req.user || !req.user.id)) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    // Update or create settings
    const updateData = {
      type,
      data
    };
    
    // Add updatedBy if user is authenticated
    if (req.user && req.user.id) {
      updateData.updatedBy = req.user.id;
    }
    
    const settings = await Settings.findOneAndUpdate(
      { type },
      updateData,
      { 
        new: true,
        upsert: true
      }
    );
    
    res.json(settings.data);
  } catch (error) {
    console.error(`Error updating ${req.params.type} settings:`, error);
    res.status(500).json({ message: 'Server error' });
  }
};
