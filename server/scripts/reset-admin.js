const mongoose = require('mongoose');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
require('dotenv').config();

async function resetAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Find admin user
    const adminUser = await User.findOne({ username: 'admin' });
    
    if (adminUser) {
      console.log('Found existing admin user. Updating password...');
      
      // Reset password to admin123
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('admin123', salt);
      
      console.log('Original password hash:', adminUser.password);
      console.log('New password hash:', hashedPassword);
      
      // Update password directly using Mongoose
      adminUser.password = 'admin123'; // This will trigger the pre-save hook
      await adminUser.save();
      
      console.log('Admin password updated successfully');
      console.log('Username: admin');
      console.log('Password: admin123');
    } else {
      console.log('No admin user found. Creating one...');
      
      const newAdmin = new User({
        username: 'admin',
        password: 'admin123', // Will be hashed by the pre-save hook
        role: 'admin'
      });
      
      await newAdmin.save();
      console.log('Admin user created successfully');
      console.log('Username: admin');
      console.log('Password: admin123');
    }
    
    // Verify password matching
    const updatedAdmin = await User.findOne({ username: 'admin' });
    console.log('Updated password hash:', updatedAdmin.password);
    
    // Test with User model's comparePassword method
    const modelPasswordMatch = await updatedAdmin.comparePassword('admin123');
    console.log(`Password verification using model method: ${modelPasswordMatch ? 'PASSED' : 'FAILED'}`);
    
    // Test with direct bcrypt compare
    const directPasswordMatch = await bcrypt.compare('admin123', updatedAdmin.password);
    console.log(`Password verification using direct bcrypt: ${directPasswordMatch ? 'PASSED' : 'FAILED'}`);
    
    // Print the User model's comparePassword method for debugging
    console.log('User model comparePassword method:');
    console.log(User.schema.methods.comparePassword.toString());
    
  } catch (error) {
    console.error('Error:', error);
  } finally {
    // Close the connection
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
  }
}

resetAdmin();
