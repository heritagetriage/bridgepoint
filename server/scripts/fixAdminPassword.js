const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../../.env' });

const fixAdminPassword = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/presidential-elegance';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');

    // Find admin user
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found in the database');
      process.exit(1);
    }
    
    console.log(`Found admin user: ${adminUser.username}`);
    
    // Hash password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    // Update password directly in database
    const result = await User.updateOne(
      { _id: adminUser._id },
      { $set: { password: hashedPassword } }
    );
    
    console.log('Update result:', result);
    console.log('Admin password has been manually reset to "password123"');
    console.log('Please try logging in again with username "admin" and password "password123"');
    
    process.exit(0);
  } catch (error) {
    console.error('Error fixing admin password:', error);
    process.exit(1);
  }
};

fixAdminPassword();
