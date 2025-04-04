const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../../.env' });

const debugLoginIssue = async () => {
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
    console.log(`Current password hash: ${adminUser.password}`);
    
    // Test password comparison directly
    const testPassword = 'password123';
    const isMatch = await adminUser.comparePassword(testPassword);
    console.log(`Password comparison result for "${testPassword}": ${isMatch}`);
    
    // Create a completely new user for testing
    const testUsername = `test_${Date.now()}`;
    console.log(`\nCreating test user: ${testUsername}`);
    
    const testUser = new User({
      username: testUsername,
      password: testPassword,
      role: 'staff'
    });
    
    await testUser.save();
    console.log(`Test user created with password: ${testPassword}`);
    
    // Test login with the new user
    const freshUser = await User.findOne({ username: testUsername });
    const freshPasswordMatch = await freshUser.comparePassword(testPassword);
    console.log(`Password comparison for new user: ${freshPasswordMatch}`);
    
    // Create a new admin user with a different username
    const newAdminUsername = 'admin2';
    console.log(`\nCreating new admin user: ${newAdminUsername}`);
    
    // Check if admin2 already exists
    const existingAdmin2 = await User.findOne({ username: newAdminUsername });
    if (existingAdmin2) {
      console.log(`User ${newAdminUsername} already exists, updating password...`);
      existingAdmin2.password = testPassword;
      await existingAdmin2.save();
    } else {
      const newAdmin = new User({
        username: newAdminUsername,
        password: testPassword,
        role: 'admin'
      });
      
      await newAdmin.save();
    }
    
    console.log(`\nPlease try logging in with these credentials:`);
    console.log(`1. Username: ${testUsername}, Password: ${testPassword}`);
    console.log(`2. Username: ${newAdminUsername}, Password: ${testPassword}`);
    
    process.exit(0);
  } catch (error) {
    console.error('Error debugging login issue:', error);
    process.exit(1);
  }
};

debugLoginIssue();
