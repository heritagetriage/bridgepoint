const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config({ path: '../../.env' });

const updateExistingAdmin = async () => {
  try {
    // Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/presidential-elegance';
    console.log('Connecting to MongoDB...');
    await mongoose.connect(mongoURI);
    console.log('MongoDB Connected');

    // Get a reference to the User collection directly
    const userCollection = mongoose.connection.collection('users');
    
    // Find the specific admin user that the system is using
    const adminId = '67e707caad3d4295a345adf6';
    console.log(`Looking for admin user with ID: ${adminId}`);
    
    const existingAdmin = await userCollection.findOne({ _id: new mongoose.Types.ObjectId(adminId) });
    
    if (!existingAdmin) {
      console.log('Admin user not found with the specified ID');
      
      // Find any admin user
      console.log('Looking for any admin user...');
      const anyAdmin = await userCollection.findOne({ role: 'admin' });
      
      if (anyAdmin) {
        console.log(`Found admin user: ${anyAdmin.username}, ID: ${anyAdmin._id}`);
        
        // Update this admin user
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash('password123', salt);
        
        const updateResult = await userCollection.updateOne(
          { _id: anyAdmin._id },
          { $set: { password: hashedPassword } }
        );
        
        console.log(`Admin user updated: ${updateResult.modifiedCount} document(s) modified`);
        console.log(`Updated admin user password to: password123`);
        
        // Verify the password hash
        const verifyAdmin = await userCollection.findOne({ _id: anyAdmin._id });
        console.log(`Password hash in database: ${verifyAdmin.password}`);
        
        // Test password comparison
        const isMatch = await bcrypt.compare('password123', verifyAdmin.password);
        console.log(`Password verification test: ${isMatch ? 'PASSED' : 'FAILED'}`);
      } else {
        console.log('No admin users found in the database');
      }
    } else {
      console.log(`Found admin user: ${existingAdmin.username}, ID: ${existingAdmin._id}`);
      
      // Update the admin user's password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('password123', salt);
      
      const updateResult = await userCollection.updateOne(
        { _id: existingAdmin._id },
        { $set: { password: hashedPassword } }
      );
      
      console.log(`Admin user updated: ${updateResult.modifiedCount} document(s) modified`);
      console.log(`Updated admin user password to: password123`);
      
      // Verify the password hash
      const verifyAdmin = await userCollection.findOne({ _id: existingAdmin._id });
      console.log(`Password hash in database: ${verifyAdmin.password}`);
      
      // Test password comparison
      const isMatch = await bcrypt.compare('password123', verifyAdmin.password);
      console.log(`Password verification test: ${isMatch ? 'PASSED' : 'FAILED'}`);
    }
    
    console.log('\nPlease try logging in with:');
    console.log('Username: admin');
    console.log('Password: password123');
    
    process.exit(0);
  } catch (error) {
    console.error('Error updating admin user:', error);
    process.exit(1);
  }
};

updateExistingAdmin();
