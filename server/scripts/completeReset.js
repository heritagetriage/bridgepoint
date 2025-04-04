const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../../.env' });

const completeReset = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/presidential-elegance';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');

    // Get a reference to the User collection directly
    const userCollection = mongoose.connection.collection('users');
    
    // List all users in the database
    console.log('Listing all users in the database:');
    const allUsers = await userCollection.find({}).toArray();
    
    allUsers.forEach(user => {
      console.log(`- Username: ${user.username}, Role: ${user.role}, ID: ${user._id}, Password hash length: ${user.password.length}`);
    });
    
    // Delete ALL users
    console.log('\nDeleting all users from the database...');
    const deleteResult = await userCollection.deleteMany({});
    console.log(`Deleted ${deleteResult.deletedCount} users`);
    
    // Create a new admin user with direct password hashing
    console.log('\nCreating new admin user...');
    
    // Hash the password manually
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash('password123', salt);
    
    // Create the user directly in the database, bypassing any middleware
    const newAdmin = await userCollection.insertOne({
      username: 'admin',
      password: hashedPassword,
      role: 'admin',
      createdAt: new Date()
    });
    
    console.log('New admin user created successfully:');
    console.log(`- Username: admin`);
    console.log(`- Password: password123`);
    console.log(`- Role: admin`);
    console.log(`- ID: ${newAdmin.insertedId}`);
    
    // Verify the password hash
    const verifyAdmin = await userCollection.findOne({ username: 'admin' });
    console.log(`Password hash in database: ${verifyAdmin.password}`);
    
    // Test password comparison
    const isMatch = await bcrypt.compare('password123', verifyAdmin.password);
    console.log(`Password verification test: ${isMatch ? 'PASSED' : 'FAILED'}`);
    
    console.log('\nPlease try logging in with:');
    console.log('Username: admin');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error resetting database:', error);
    process.exit(1);
  }
};

completeReset();
