const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Protect routes
exports.protect = async (req, res, next) => {
  try {
    console.log('Auth middleware called for route:', req.originalUrl);
    console.log('Headers:', JSON.stringify(req.headers));
    
    let token;
    
    // Check if token exists in headers
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
      console.log('Token found in authorization header');
    }
    
    // Check if token exists
    if (!token) {
      console.log('No token found in request');
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
    
    try {
      // Verify token
      console.log('Verifying token with secret:', process.env.JWT_SECRET ? 'Secret exists' : 'No secret found');
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
      console.log('Token verified successfully. User:', decoded);
      
      // Add user to request
      req.user = decoded;
      next();
    } catch (error) {
      console.error('Token verification failed:', error.message);
      return res.status(401).json({
        success: false,
        message: 'Not authorized to access this route'
      });
    }
  } catch (error) {
    console.error('Auth middleware error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Check user role
exports.authorize = (...roles) => {
  return (req, res, next) => {
    console.log(`Checking if user role '${req.user.role}' is in allowed roles:`, roles);
    if (!roles.includes(req.user.role)) {
      console.log(`User role '${req.user.role}' not authorized for this route`);
      return res.status(403).json({
        success: false,
        message: `User role ${req.user.role} is not authorized to access this route`
      });
    }
    console.log('User role authorized, proceeding to next middleware');
    next();
  };
};
