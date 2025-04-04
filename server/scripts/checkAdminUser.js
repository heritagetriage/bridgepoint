const mongoose = require('mongoose');
const User = require('../models/User');
require('dotenv').config({ path: '../../.env' });

const checkAdminUser = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/presidential-elegance';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');

    // Find all users
    const users = await User.find({});
    console.log(`Found ${users.length} users in the database:`);
    
    users.forEach(user => {
      console.log(`- Username: ${user.username}, Role: ${user.role}, ID: ${user._id}, Created: ${user.createdAt}`);
    });
    
    // Find admin user specifically
    const adminUser = await User.findOne({ role: 'admin' });
    
    if (adminUser) {
      console.log('\nAdmin user details:');
      console.log(`- Username: ${adminUser.username}`);
      console.log(`- Role: ${adminUser.role}`);
      console.log(`- ID: ${adminUser._id}`);
      console.log(`- Created: ${adminUser.createdAt}`);
      console.log(`- Password hash length: ${adminUser.password.length}`);
    } else {
      console.log('\nNo admin user found in the database');
    }
    
    process.exit(0);
  } catch (error) {
    console.error('Error checking admin user:', error);
    process.exit(1);
  }
};

checkAdminUser();
