const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../../.env' });

const recreateAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/presidential-elegance';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');

    // Delete existing admin users
    console.log('Removing existing admin users...');
    const deleteResult = await User.deleteMany({ role: 'admin' });
    console.log(`Deleted ${deleteResult.deletedCount} admin users`);

    // Create a new admin user with direct password hashing
    console.log('Creating new admin user...');
    
    // Hash the password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    // Create the user directly with the hashed password
    const newAdmin = await User.create({
      username: 'admin',
      password: hashedPassword,
      role: 'admin'
    });
    
    // Skip the pre-save hook by using updateOne
    await User.updateOne(
      { _id: newAdmin._id },
      { $set: { password: hashedPassword } }
    );
    
    console.log('New admin user created successfully:');
    console.log(`- Username: admin`);
    console.log(`- Password: password123`);
    console.log(`- Role: admin`);
    console.log(`- ID: ${newAdmin._id}`);
    
    // Verify the password hash
    const verifyAdmin = await User.findOne({ username: 'admin' });
    console.log(`Password hash in database: ${verifyAdmin.password}`);
    
    // Test password comparison
    const isMatch = await bcrypt.compare('password123', verifyAdmin.password);
    console.log(`Password verification test: ${isMatch ? 'PASSED' : 'FAILED'}`);
    
    console.log('\nPlease try logging in with:');
    console.log('Username: admin');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error recreating admin user:', error);
    process.exit(1);
  }
};

recreateAdmin();
