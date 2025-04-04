const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Register a new admin user
exports.register = async (req, res) => {
  console.log('==== REGISTER ENDPOINT CALLED ====');
  console.log('Request body:', JSON.stringify(req.body));
  console.log('Authenticated user:', req.user ? JSON.stringify(req.user) : 'No user in request');
  console.log('Request headers:', JSON.stringify(req.headers));
  console.log('Request method:', req.method);
  console.log('Request path:', req.path);
  
  try {
    const { username, password, role } = req.body;
    
    if (!username || !password) {
      console.log('Missing required fields:', { username: !!username, password: !!password });
      return res.status(400).json({
        success: false,
        message: 'Please provide username and password'
      });
    }
    
    console.log('Register request received:', { username, role });
    
    // Check if user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      console.log('Username already exists:', username);
      return res.status(400).json({
        success: false,
        message: 'Username already exists'
      });
    }
    
    // Create new user
    console.log('Creating new user in database...');
    const user = await User.create({
      username,
      password,
      role: role || 'staff'
    });
    
    console.log('User created successfully:', {
      id: user._id,
      username: user.username,
      role: user.role
    });
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );
    
    res.status(201).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
        createdAt: user.createdAt
      }
    });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Login user
exports.login = async (req, res) => {
  try {
    console.log('==== LOGIN ENDPOINT CALLED ====');
    console.log('Request body:', JSON.stringify(req.body));
    console.log('Request headers:', JSON.stringify(req.headers));
    
    const { username, password } = req.body;
    console.log(`Login attempt for username: ${username}`);
    
    // Check if user exists
    const user = await User.findOne({ username });
    if (!user) {
      console.log(`User not found: ${username}`);
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    console.log(`User found: ${user.username}, ID: ${user._id}, Role: ${user.role}`);
    console.log(`Stored password hash length: ${user.password.length}`);
    
    // Check if password matches
    console.log('Comparing password...');
    const isMatch = await user.comparePassword(password);
    console.log(`Password comparison result: ${isMatch}`);
    
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
    
    console.log('Password matched successfully');
    
    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET || 'your-secret-key',
      { expiresIn: '1d' }
    );
    
    console.log('JWT token generated successfully');
    
    res.status(200).json({
      success: true,
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get current user
exports.getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    console.error('Error getting user:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get all users (admin only)
exports.getUsers = async (req, res) => {
  try {
    console.log('Fetching all users from database...');
    
    // Get all users without any filtering
    const users = await User.find({}).select('-password');
    console.log(`Found ${users.length} users in database:`, users.map(u => u.username));
    
    // Transform users to match the expected format in the frontend
    const transformedUsers = users.map(user => ({
      id: user._id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt
    }));
    
    console.log('Transformed users for frontend:', transformedUsers);
    
    res.status(200).json({
      success: true,
      data: transformedUsers
    });
  } catch (error) {
    console.error('Error getting users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Get test users (for debugging)
exports.getTestUsers = async (req, res) => {
  try {
    console.log('Fetching test users from database...');
    
    // Find users with test_ prefix in username
    const testUsers = await User.find({ 
      username: { $regex: /^test_/ } 
    }).select('-password');
    
    console.log(`Found ${testUsers.length} test users`);
    
    // Also get admin2 if it exists
    const admin2 = await User.findOne({ username: 'admin2' }).select('-password');
    if (admin2) {
      testUsers.push(admin2);
      console.log('Found admin2 user');
    }
    
    const users = testUsers.map(user => ({
      id: user._id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt
    }));
    
    res.status(200).json({
      success: true,
      users: users
    });
  } catch (error) {
    console.error('Error getting test users:', error);
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
};

// Delete user (admin only)
exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // Prevent deleting the last admin user
    const adminCount = await User.countDocuments({ role: 'admin' });
    if (user.role === 'admin' && adminCount <= 1) {
      return res.status(400).json({
        success: false,
        message: 'Cannot delete the last admin user'
      });
    }
    
    // Delete the user
    await User.findByIdAndDelete(userId);
    
    res.status(200).json({
      success: true,
      message: 'User deleted successfully'
    });
    
  } catch (error) {
    console.error('Error in deleteUser:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update user (admin only)
exports.updateUser = async (req, res) => {
  try {
    const { userId } = req.params;
    const updates = req.body;
    
    // Check if user exists
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }
    
    // If updating role, prevent removing the last admin
    if (updates.role && user.role === 'admin' && updates.role !== 'admin') {
      const adminCount = await User.countDocuments({ role: 'admin' });
      if (adminCount <= 1) {
        return res.status(400).json({
          success: false,
          message: 'Cannot remove the last admin user'
        });
      }
    }
    
    // If password is provided, hash it
    if (updates.password) {
      updates.password = await bcrypt.hash(updates.password, 10);
    }
    
    // Update the user
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { $set: updates },
      { new: true, select: '-password' }
    );
    
    res.status(200).json({
      success: true,
      user: {
        id: updatedUser._id,
        username: updatedUser.username,
        role: updatedUser.role,
        createdAt: updatedUser.createdAt
      }
    });
    
  } catch (error) {
    console.error('Error in updateUser:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
