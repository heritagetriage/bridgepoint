require('dotenv').config({ path: require('path').join(__dirname, '../.env') });
const mongoose = require('mongoose');
const User = require('./models/User');
const bcrypt = require('bcryptjs');

// Connect to MongoDB
const connectDB = async () => {
  try {
    console.log('Connecting to MongoDB...');
    const mongoURI = process.env.MONGODB_URI;
    console.log('MongoDB URI:', mongoURI ? 'URI found in .env' : 'No URI found');
    
    if (!mongoURI) {
      throw new Error('MongoDB URI not found in environment variables');
    }
    
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected');
    
    // Get connection information
    const db = mongoose.connection;
    console.log('Connected to database:', db.name);
    console.log('Connected to host:', db.host);
    console.log('Connected to port:', db.port);
    
    // List all users
    console.log('Fetching all users...');
    const users = await User.find().select('-password');
    console.log('All users in database:', users);
    
    // Create a test user with a unique name
    const timestamp = new Date().getTime();
    const username = `testuser_${timestamp}`;
    const password = 'password123';
    const role = 'staff';
    
    // Create the user
    console.log('Creating new user:', username);
    const user = await User.create({
      username,
      password,
      role
    });
    
    console.log('User created successfully:', {
      id: user._id,
      username: user.username,
      role: user.role,
      createdAt: user.createdAt
    });
    
    // List all users again
    console.log('Fetching all users after creation...');
    const updatedUsers = await User.find().select('-password');
    console.log('All users in database after creation:', updatedUsers);
    
    mongoose.disconnect();
    console.log('MongoDB disconnected');
    
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
};

connectDB();
