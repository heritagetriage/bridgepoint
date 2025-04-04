const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: '../../.env' });

const resetAdminPassword = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/presidential-elegance';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');

    // Find admin user
    let adminUser = await User.findOne({ role: 'admin' });
    
    if (!adminUser) {
      console.log('No admin user found in the database. Creating a new admin user...');
      
      // Create a new admin user
      adminUser = await User.create({
        username: 'admin',
        password: 'password123',
        role: 'admin'
      });
      
      console.log('Admin user created successfully with username: admin');
    } else {
      console.log(`Found admin user: ${adminUser.username}`);
      
      // Update password
      adminUser.password = 'password123';
      await adminUser.save();
      
      console.log('Admin password has been reset to "password123"');
    }
    
    console.log('Please change this password as soon as possible for security reasons');
    
    process.exit(0);
  } catch (error) {
    console.error('Error resetting/creating admin password:', error);
    process.exit(1);
  }
};

resetAdminPassword();
