const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config();

async function checkUsers() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Find all users
    const users = await User.find({}).select('-__v');
    console.log(`Found ${users.length} users:`);
    
    // Display users
    users.forEach(user => {
      console.log({
        id: user._id.toString(),
        username: user.username,
        role: user.role,
        passwordHash: user.password.substring(0, 10) + '...',
        createdAt: user.createdAt
      });
    });
    
    // Create admin user if none exists
    if (!users.some(user => user.username === 'admin')) {
      console.log('No admin user found. Creating one...');
      
      const adminUser = new User({
        username: 'admin',
        password: 'admin123',
        role: 'admin'
      });
      
      await adminUser.save();
      console.log('Admin user created successfully');
    } else {
      console.log('Admin user already exists');
    }
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

checkUsers();
