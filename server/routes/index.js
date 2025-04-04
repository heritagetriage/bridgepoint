const express = require('express');
const messageRoutes = require('./messageRoutes');
const authRoutes = require('./authRoutes');
const eventRoutes = require('./eventRoutes');
const userRoutes = require('./userRoutes');
const settingsRoutes = require('./settingsRoutes');

/**
 * Initialize all API routes
 * @param {express.Application} app - Express application instance
 */
const initializeRoutes = (app) => {
  // API routes
  app.use('/api/messages', messageRoutes);
  app.use('/api/auth', authRoutes);
  app.use('/api/events', eventRoutes);
  app.use('/api/users', userRoutes);
  app.use('/api/settings', settingsRoutes);
  
  // Log registered routes
  console.log('API routes registered:');
  console.log('- /api/messages');
  console.log('- /api/auth');
  console.log('- /api/events');
  console.log('- /api/users');
  console.log('- /api/settings');
  
  return app;
};

module.exports = initializeRoutes;
