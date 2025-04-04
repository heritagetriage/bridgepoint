const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['general', 'notifications', 'security'],
  },
  data: {
    type: mongoose.Schema.Types.Mixed,
    required: true
  },
  updatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
}, {
  timestamps: true
});

// Create a compound index to ensure only one document per settings type
settingsSchema.index({ type: 1 }, { unique: true });

module.exports = mongoose.model('Settings', settingsSchema);
